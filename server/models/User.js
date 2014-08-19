var mongoose        = require('mongoose');
var bcrypt          = require('bcryptjs');
var async           = require('async');
var config          = require('../../config');
var emailController = require('../controllers/email/email');
var strings         = require('../constants/strings');
var SALT_FACTOR     = 5;

// Create a basic user schema
var userSchema = mongoose.Schema({
    email       : {type: String},
    password    : String,

    // Account status
    active  : {type: Boolean, default: false},

    // Keys for activation and password
    activationKey       : String,
    passwordResetKey    : String,

    // Authentication data from third party services
    tokens      : Array,
    facebook    : {type: String, unique: true, sparse: true},
    twitter     : {type: String, unique: true, sparse: true},
    google      : {type: String, unique: true, sparse: true},
    github      : {type: String, unique: true, sparse: true},
    linkedin    : {type: String, unique: true, sparse: true},

    // Profile information
    profile: {
        name        : {type: String, default: ''},
        gender      : {type: String, default: ''},
        location    : {type: String, default: ''},
        picture     : {type: String, default: ''}
    }
});

// Before saving a new user, hash their password
userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    function generateSalt(callback) {
        bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
            return callback(err, salt);
        });
    }

    function hashPassword(salt, callback) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            return callback(err, hash);
        });
    }

    function generateActivationKey(hash, callback) {
        user.password = hash;

        bcrypt.hash(user.email + Date.now(), 8, function(err, dirtyKey) {
            var cleanKey;

            if (!user.active) {
                // Replace any characters that could cause problems
                // when using the activation key in a URL.
                cleanKey = dirtyKey.replace(/[\$]|[\/]|[\.]/g, '');

                user.activationKey = cleanKey;

                user.sendActivationEmail();
            }

            return callback(err, cleanKey);
        });
    }

    async.waterfall([
        generateSalt,
        hashPassword,
        generateActivationKey
    ], function(err, results) {
        if (err) {return next(err);}

        return next(null, results);
    });
});

/*
Instance methods
 */

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {return callback(err);}
    
        return callback(null, isMatch);
    });
};

// Sending activation email
userSchema.methods.sendActivationEmail = function() {
    var self            = this;
    var activationUrl   = 'http://';
    var devEnvironment  = ('production' !== process.env.NODE_ENV && 'development' === config.settings.env);

    if (devEnvironment) {
        activationUrl += '127.0.0.1:' + config.settings.port;
    } else {
        activationUrl += config.settings.domain;
    }

    activationUrl += '/users/activate/' + this.activationKey;

    function renderEmailTemplate(callback) {
        emailController.renderTemplate('emails/activation', {
            activationUrl: activationUrl
        }, callback);
    }

    function sendEmail(html, callback) {
        emailController.sendEmail({
            to      : self.email,
            subject : strings.ACTIVATION_EMAIL_SUBJECT,
            text    : strings.ACTIVATION_EMAIL_TEXT + activationUrl,
            html    : html
        }, callback);
    }

    async.waterfall([
        renderEmailTemplate,
        sendEmail
    ], function (err, results) {
        if (err) {return console.log(strings.SEND_EMAIL_FAILED, err);}

        return console.log(results);
    });
};

/*
Static methods
 */

userSchema.statics.activate = function(activationKey, callback) {
    var User = this || mongoose.model('User');

    function findUserByActivationKey(callback) {
        User.findOne({activationKey: activationKey}, callback);
    }

    function activateUser(user, callback) {
        if (!user) {return callback(strings.ACTIVATION_KEY_NOT_FOUND);}

        user.active = true;
        user.activationKey = undefined;

        user.save(callback);
    }

    async.waterfall([
        findUserByActivationKey,
        activateUser
    ], function(err) {
        return callback(err);
    });
};

// Create a model using the schema
var User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
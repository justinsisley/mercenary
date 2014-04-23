var config          = require('../../config'),
    emailController = require('../controllers/email/emailController'),
    mongoose        = require('mongoose'),
    bcrypt          = require('bcrypt');

// Create a basic user schema
var userSchema = mongoose.Schema({
    email               : {type: String, unique: true},
    password            : String,

    // Account status
    active              : {type: Boolean, default: false},

    // Keys for activation and password
    activationKey       : String,
    passwordResetKey    : String,

    // Authentication data from third party services
    tokens              : Array,
    facebook            : {type: String, unique: true, sparse: true},
    twitter             : {type: String, unique: true, sparse: true},
    google              : {type: String, unique: true, sparse: true},
    github              : {type: String, unique: true, sparse: true},

    // Profile information
    profile: {
        name        : {type: String, default: ''},
        gender      : {type: String, default: ''},
        location    : {type: String, default: ''},
        website     : {type: String, default: ''},
        picture     : {type: String, default: ''}
    }
});

// Before saving a new user, hash their password
userSchema.pre('save', function(next) {
    var user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        // Hash the user's password
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;

            // Create an activation key based on the current time
            // and the user's email address.
            bcrypt.hash(user.email + Date.now(), 8, function(err, hash) {
                if (err) {
                    return next(err);
                }

                // Replace any characters that could cause problems
                // when using the activation key in a URL.
                user.activationKey = hash.replace(/[\$]|[\/]|[\.]/g, '');

                user.sendActivationEmail();

                next();
            });
        });
    });
});

/*
Instance methods
 */

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
    
        callback(null, isMatch);
    });
};

// Sending activation email
userSchema.methods.sendActivationEmail = function() {
    var self = this,
        activationUrl = 'http://';

    if ('development' === config.settings.env || 'development' === process.env.NODE_ENV) {
        activationUrl += '127.0.0.1:' + config.settings.port;
    } else {
        activationUrl += config.settings.domain;
    }

    activationUrl += '/users/activate/' + this.activationKey;

    emailController.renderTemplate('emails/activation', {
        activationUrl: activationUrl
    }, function(err, html) {
        if (err) {
            console.log('error:emailController.renderTemplate', err);
            
            return err;
        }

        emailController.sendEmail({
            to      : self.email,
            subject : 'Activate your Mercenary account',
            text    : 'Paste the following link into your browser to activate your Mercenary account: ' + activationUrl,
            html    : html
        }, function(err, res) {
            if (err) {
                console.log('error:emailController.sendEmail', err);
            }

            console.log(res);
        });
    });
};

/*
Static methods
 */
userSchema.statics.activate = function(activationKey, callback) {
    var User = this || mongoose.model('User');

    User.findOne({activationKey: activationKey}, function(err, user) {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback('No user found with that activation key.');
        }

        user.active = true;
        user.activationKey = undefined;

        user.save(function(err) {
            if (err) {
                callback(err);
            }

            return callback(err);
        });
    });
};

// Create a model using the schema
var User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
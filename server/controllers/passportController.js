var _                   = require('underscore');
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy     = require('passport-twitter').Strategy;
var GitHubStrategy      = require('passport-github').Strategy;
var LinkedInStrategy    = require('passport-linkedin-oauth2').Strategy;
var InstagramStrategy   = require('passport-instagram').Strategy;
var async               = require('async');
var config              = require('../../config');
var User                = require('../models/User');

passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        return done(err, user);
    });
});

// Local user authentication
passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
    // Look up a user by email
    function findUserById(callback) {
        User.findOne({email: email}, callback);
    }

    // Verify that the provided password matches
    // the user's hashed password
    function confirmCurrentPassword(user, callback) {
        if (!user) {
            return done(null, false, {message: 'Email ' + email + ' not found'});
        }

        // Bind the callback to the user context, so we can
        // call the `respond` function below, and the value
        // of "this" will be `user`.
        user.comparePassword(password, callback.bind(user));
    }

    // Completion
    function respond(err, passwordConfirmed) {
        if (!passwordConfirmed) {
            return done(null, false, {message: 'Invalid email or password.'});
        }

        return done(null, this);
    }

    async.waterfall([
        findUserById,
        confirmCurrentPassword
    ], respond);
}));

// Save an OAuth user to the DB.
// This is an abstraction that is meant
// to be used across each Passport strategy.
function saveOAuthUser(user, data, callback) {
    if (data.email) {
        user.email = data.email;
    }

    user[data.service] = data.id;
    
    user.tokens.push({
        kind: data.service,
        accessToken: data.accessToken,
        tokenSecret: data.tokenSecret
    });

    user.profile.name = user.profile.name ||
                        data.profile.displayName;

    user.profile.gender = user.profile.gender ||
                            data.gender;

    user.profile.picture = user.profile.picture ||
                            data.profile.picture ||
                            data.profile._json.profile_image_url ||
                            data.profile._json.picture ||
                            data.profile._json.avatar_url ||
                            data.profile._json.pictureUrl ||
                            data.profile._json.profile_picture;

    user.active = true;

    user.save(callback.bind(user));
}

// `this` is explicitly bound
// when this function is called
function userExists(callback) {
    var self = this;

    if (!this.profile._json.email) {
        return callback(null, !!this.user, this);
    }

    User.findOne({email: this.profile._json.email}, function(err, user) {
        if (user) {
            self.user = user;

            // Second parameter is boolean indicating
            // whether or not the user exists; third
            // parameter is the context that this
            // function was called with, which
            // represents the data passed in each
            // Passport auth strategy.
            return callback(null, true, self);
        }

        return callback(null, false, self);
    });
}

function findUser(userExists, data, callback) {
    var query = {};

    if (userExists) {
        User.findById(data.user.id, function(err, user) {
            return callback(err, user, data);
        });
    } else {
        query[data.service] = data.profile.id;

        User.findOne(query, function(err, user) {
            return callback(err, user, data);
        });
    }
}

function updateOrCreateUser(user, oAuthData, callback) {
    if (!user) {
        user = new User();
    }

    saveOAuthUser(user, oAuthData, callback);
}

var facebookClientId = (process.env.FACEBOOK_CLIENT_ID || config.secrets.auth.facebook.clientId);
var facebookClientSecret = (process.env.FACEBOOK_CLIENT_SECRET || config.secrets.auth.facebook.clientSecret);

if (config.settings.auth.facebook) {
    if (!facebookClientId) {
        throw new Error('Missing Facebook Client ID');
    }

    if (!facebookClientSecret) {
        throw new Error('Missing Facebook Client Secret');
    }

    passport.use(new FacebookStrategy({
        clientID            : facebookClientId,
        clientSecret        : facebookClientSecret,
        callbackURL         : '/auth/facebook/callback',
        passReqToCallback   : true
    }, function(req, accessToken, refreshToken, profile, done) {
        var data = {
            service     : 'facebook',
            profile     : profile,
            accessToken : accessToken,
            user        : req.user
        };

        async.waterfall([
            userExists.bind(data),
            findUser,
            updateOrCreateUser
        ], function(err) {
            return done(err, this);
        });
    }));
}

var googleClientId = (process.env.GOOGLE_CLIENT_ID || config.secrets.auth.google.clientId);
var googleClientSecret = (process.env.GOOGLE_CLIENT_SECRET || config.secrets.auth.google.clientSecret);

if (config.settings.auth.google) {
    if (!googleClientId) {
        throw new Error('Missing Google Client ID');
    }

    if (!googleClientSecret) {
        throw new Error('Missing Google Client Secret');
    }

    passport.use(new GoogleStrategy({
        clientID            : googleClientId,
        clientSecret        : googleClientSecret,
        callbackURL         : '/auth/google/callback',
        passReqToCallback   : true
    }, function(req, accessToken, refreshToken, profile, done) {
        var data = {
            service     : 'google',
            profile     : profile,
            accessToken : accessToken,
            user        : req.user
        };

        async.waterfall([
            userExists.bind(data),
            findUser,
            updateOrCreateUser
        ], function(err) {
            return done(err, this);
        });
    }));
}

var twitterConsumerKey = (process.env.TWITTER_CONSUMER_KEY || config.secrets.auth.twitter.consumerKey);
var twitterConsumerSecret = (process.env.TWITTER_CONSUMER_SECRET || config.secrets.auth.twitter.consumerSecret);

if (config.settings.auth.twitter) {
    if (!twitterConsumerKey) {
        throw new Error('Missing Twitter Consumer Key');
    }

    if (!twitterConsumerSecret) {
        throw new Error('Missing Twitter Consumer Secret');
    }

    passport.use(new TwitterStrategy({
        consumerKey         : twitterConsumerKey,
        consumerSecret      : twitterConsumerSecret,
        callbackURL         : '/auth/twitter/callback',
        passReqToCallback   : true
    }, function(req, accessToken, tokenSecret, profile, done) {
        var data = {
            service     : 'twitter',
            profile     : profile,
            accessToken : accessToken,
            tokenSecret : tokenSecret,
            user        : req.user
        };

        async.waterfall([
            userExists.bind(data),
            findUser,
            updateOrCreateUser
        ], function(err) {
            return done(err, this);
        });
    }));
}

var githubClientId = (process.env.GITHUB_CLIENT_ID || config.secrets.auth.github.clientId);
var githubClientSecret = (process.env.GITHUB_CLIENT_SECRET || config.secrets.auth.github.clientSecret);

if (config.settings.auth.github) {
    if (!githubClientId) {
        throw new Error('Missing Github Client ID');
    }

    if (!githubClientSecret) {
        throw new Error('Missing Github Client Secret');
    }

    passport.use(new GitHubStrategy({
        clientID: githubClientId,
        clientSecret: githubClientSecret,
        callbackURL: '/auth/github/callback',
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
        var data = {
            service     : 'github',
            profile     : profile,
            accessToken : accessToken,
            user        : req.user
        };

        async.waterfall([
            userExists.bind(data),
            findUser,
            updateOrCreateUser
        ], function(err) {
            return done(err, this);
        });
    }));
}

var linkedInClientId = (process.env.LINKEDIN_CLIENT_ID || config.secrets.auth.linkedin.clientId);
var linkedInClientSecret = (process.env.LINKEDIN_CLIENT_SECRET || config.secrets.auth.linkedin.clientSecret);

if (config.settings.auth.linkedin) {
    if (!linkedInClientId) {
        throw new Error('Missing LinkedIn Client ID');
    }

    if (!linkedInClientSecret) {
        throw new Error('Missing LinkedIn Client Secret');
    }

    passport.use(new LinkedInStrategy({
        clientID: linkedInClientId,
        clientSecret: linkedInClientSecret,
        callbackURL: '/auth/linkedin/callback',
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
        var data = {
            service     : 'linkedin',
            profile     : profile,
            accessToken : accessToken,
            user        : req.user
        };

        async.waterfall([
            userExists.bind(data),
            findUser,
            updateOrCreateUser
        ], function(err) {
            return done(err, this);
        });
    }));
}

var instagramClientId = (process.env.INSTAGRAM_CLIENT_ID || config.secrets.auth.instagram.clientId);
var instagramClientSecret = (process.env.INSTAGRAM_CLIENT_SECRET || config.secrets.auth.instagram.clientSecret);

if (config.settings.auth.instagram) {
    if (!instagramClientId) {
        throw new Error('Missing Instagram Client ID');
    }

    if (!instagramClientSecret) {
        throw new Error('Missing Instagram Client Secret');
    }

    passport.use(new InstagramStrategy({
        clientID: instagramClientId,
        clientSecret: instagramClientSecret,
        callbackURL: '/auth/instagram/callback',
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
        var data = {
            service     : 'instagram',
            profile     : profile,
            accessToken : accessToken,
            user        : req.user
        };

        async.waterfall([
            userExists.bind(data),
            findUser,
            updateOrCreateUser
        ], function(err) {
            return done(err, this);
        });
    }));
}

exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.json({
        status: 'fail'
    });
};

exports.isAuthorized = function(req, res, next) {
    var provider = req.path.split('/').slice(-1)[0];
    var token = _.findWhere(req.user.tokens, {kind: provider});

    if (token) {
        return next();
    } else {
        return res.redirect('/auth/' + provider);
    }
};
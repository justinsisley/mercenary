var _                   = require('underscore');
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var TwitterStrategy     = require('passport-twitter').Strategy;
var GitHubStrategy      = require('passport-github').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;
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

passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
        if (!user) {
            return done(null, false, {message: 'Email ' + email + ' not found'});
        }
        
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid email or password.'});
            }
        });
    });
}));

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
        clientID: facebookClientId,
        clientSecret: facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
        if (req.user) {
            User.findById(req.user.id, function(err, user) {
                user.facebook = profile.id;
                
                user.tokens.push({
                    kind: 'facebook',
                    accessToken: accessToken
                });

                user.profile.name = user.profile.name || profile.displayName;
                user.profile.gender = user.profile.gender || profile._json.gender;
                user.profile.picture = user.profile.picture || profile._json.profile_image_url;

                user.active = true;
                
                user.save(function(err) {
                    return done(err, user);
                });
            });
        } else {
            User.findOne({facebook: profile.id}, function(err, existingUser) {
                if (existingUser) {
                    return done(null, existingUser);
                }

                User.findOne({email: profile._json.email}, function(err, user) {
                    if (!user) {
                        user = new User();
                    }

                    user.email = profile._json.email;
                    user.facebook = profile.id;
                    
                    user.tokens.push({
                        kind: 'facebook',
                        accessToken: accessToken
                    });
                    
                    user.profile.name = profile.displayName;
                    user.profile.gender = profile._json.gender;
                    user.profile.picture = profile._json.profile_image_url;

                    user.active = true;
                    
                    user.save(function(err) {
                        return done(err, user);
                    });
                });
            });
        }
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
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
        if (req.user) {
            User.findById(req.user.id, function(err, user) {
                user.google = profile.id;
                
                user.tokens.push({
                    kind: 'google',
                    accessToken: accessToken
                });
                
                user.profile.name = user.profile.name || profile.displayName;
                user.profile.gender = user.profile.gender || profile._json.gender;
                user.profile.picture = user.profile.picture || profile._json.picture;

                user.active = true;
                
                user.save(function(err) {
                    return done(err, user);
                });
            });
        } else {
            User.findOne({google: profile.id}, function(err, existingUser) {
                if (existingUser) {
                    return done(null, existingUser);
                }

                User.findOne({email: profile._json.email}, function(err, user) {
                    if (!user) {
                        user = new User();
                    }

                    user.email = profile._json.email;
                    user.google = profile.id;
                    
                    user.tokens.push({
                        kind: 'google',
                        accessToken: accessToken
                    });
                    
                    user.profile.name = profile.displayName;
                    user.profile.gender = profile._json.gender;
                    user.profile.picture = profile._json.picture;

                    user.active = true;

                    user.save(function(err) {
                        return done(err, user);
                    });
                });
            });
        }
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
        consumerKey: twitterConsumerKey,
        consumerSecret: twitterConsumerSecret,
        callbackURL: '/auth/twitter/callback',
        passReqToCallback: true
    }, function(req, accessToken, tokenSecret, profile, done) {
        if (req.user) {
            User.findById(req.user.id, function(err, user) {
                user.twitter = profile.id;
                
                user.tokens.push({
                    kind: 'twitter',
                    accessToken: accessToken,
                    tokenSecret: tokenSecret
                });
                
                user.profile.name = user.profile.name || profile.displayName;
                user.profile.location = user.profile.location || profile._json.location;
                user.profile.picture = user.profile.picture || profile._json.profile_image_url;

                user.active = true;
                
                user.save(function(err) {
                    return done(err, user);
                });
            });
        } else {
            User.findOne({twitter: profile.id}, function(err, existingUser) {
                if (existingUser) {
                    return done(null, existingUser);
                }
                
                var user = new User();
                
                user.twitter = profile.id;
                
                user.tokens.push({
                    kind: 'twitter',
                    accessToken: accessToken,
                    tokenSecret: tokenSecret
                });
                
                user.profile.name = profile.displayName;
                user.profile.location = profile._json.location;
                user.profile.picture = profile._json.profile_image_url;

                user.active = true;
                
                user.save(function(err) {
                    return done(err, user);
                });
            });
        }
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
        if (req.user) {
            User.findById(req.user.id, function(err, user) {
                user.github = profile.id;
                
                user.tokens.push({
                    kind: 'github',
                    accessToken: accessToken
                });
                
                user.profile.name = user.profile.name || profile.displayName;
                user.profile.picture = user.profile.picture || profile._json.avatar_url;
                user.profile.location = user.profile.location || profile._json.location;

                user.active = true;
                
                user.save(function(err) {
                    return done(err, user);
                });
            });
        } else {
            User.findOne({github: profile.id}, function(err, existingUser) {
                if (existingUser) {
                    return done(null, existingUser);
                }

                User.findOne({email: profile._json.email}, function(err, user) {
                    if (!user) {
                        user = new User();
                    }

                    user.email = profile._json.email;
                    user.github = profile.id;
                    
                    user.tokens.push({
                        kind: 'github',
                        accessToken: accessToken
                    });
                    
                    user.profile.name = profile.displayName;
                    user.profile.picture = profile._json.avatar_url;
                    user.profile.location = profile._json.location;

                    user.active = true;
                    
                    user.save(function(err) {
                        return done(err, user);
                    });
                });
            });
        }
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
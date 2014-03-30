var config                  = require('../config'),
    passport                = require('passport'),
    passportController      = require('../controllers/passportController'),
    baseController          = require('../controllers/baseController'),
    sessionController       = require('../controllers/users/sessionController'),
    signupController        = require('../controllers/users/signupController'),
    loginController         = require('../controllers/users/loginController'),
    logoutController        = require('../controllers/users/logoutController');

module.exports = function(app) {
    // Determine if there is an active session
    app.get('/session', passportController.isAuthenticated, sessionController);
    
    // Create a local user account
    app.post('/signup', signupController.createUser);

    // Activate a local user's account
    app.get('/activate/*', signupController.activateUser);

    // Log in to a local user account
    app.post('/login', loginController);

    // End the current session
    app.post('/logout', logoutController);

    // Third-party authentication
    if (config.AUTH_FACEBOOK_ENABLED) {
        app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    }

    if (config.AUTH_GOOGLE_ENABLED) {
        app.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));
        app.get('/auth/google/callback', passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    }

    if (config.AUTH_TWITTER_ENABLED) {
        app.get('/auth/twitter', passport.authenticate('twitter'));
        app.get('/auth/twitter/callback', passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    }
    
    if (config.AUTH_GITHUB_ENABLED) {
        app.get('/auth/github', passport.authenticate('github'));
        app.get('/auth/github/callback', passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    }

    // Route all other requests to the base controller.
    app.get('*', baseController);
};
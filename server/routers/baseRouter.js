var config                  = require('../config'),
    express                 = require('express'),
    router                  = express.Router(),
    passport                = require('passport'),
    passportController      = require('../controllers/passportController'),
    baseController          = require('../controllers/baseController'),
    sessionController       = require('../controllers/users/sessionController'),
    signupController        = require('../controllers/users/signupController'),
    loginController         = require('../controllers/users/loginController'),
    logoutController        = require('../controllers/users/logoutController');

// Determine if there is an active session
router.get('/session', passportController.isAuthenticated, sessionController);

// Create a local user account
router.post('/signup', signupController.createUser);

// Activate a local user's account
router.get('/activate/*', signupController.activateUser);

// Log in to a local user account
router.post('/login', loginController);

// End the current session
router.post('/logout', logoutController);

// Third-party authentication
if (config.AUTH_FACEBOOK_ENABLED) {
    router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}

if (config.AUTH_GOOGLE_ENABLED) {
    router.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));
    router.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}

if (config.AUTH_TWITTER_ENABLED) {
    router.get('/auth/twitter', passport.authenticate('twitter'));
    router.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}

if (config.AUTH_GITHUB_ENABLED) {
    router.get('/auth/github', passport.authenticate('github'));
    router.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}

// Route all other requests to the base controller.
router.get('*', baseController);

module.exports = router;
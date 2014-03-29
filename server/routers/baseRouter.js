var passport                = require('passport'),
    passportController      = require('../controllers/passportController'),
    baseController          = require('../controllers/baseController'),
    sessionController       = require('../controllers/users/sessionController'),
    signupController        = require('../controllers/users/signupController'),
    loginController         = require('../controllers/users/loginController'),
    activationController    = require('../controllers/users/activationController'),
    logoutController        = require('../controllers/users/logoutController');

exports.router = function(server) {
    // Determine if there is an active session
    server.get('/session', passportController.isAuthenticated, sessionController);
    
    // Create a local user account
    server.post('/signup', signupController);

    // Activate a local user's account
    server.get('/activate/*', activationController.activateUser);

    // Log in to a local user account
    server.post('/login', loginController);

    // End the current session
    server.post('/logout', logoutController);

    // Third-party authentication
    server.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    server.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    server.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));
    server.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    server.get('/auth/twitter', passport.authenticate('twitter'));
    server.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    
    server.get('/auth/github', passport.authenticate('github'));
    server.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    // Route all other requests to the base controller.
    server.get('*', baseController);
};
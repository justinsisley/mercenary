var passport            = require('passport'),
    passportController  = require('../controllers/passportController'),
    sessionController   = require('../controllers/users/sessionController'),
    baseController      = require('../controllers/baseController'),
    signupController    = require('../controllers/users/signupController');

exports.router = function(server) {
    // Create a local user account
    server.post('/signup', signupController);

    server.get('/login', function(req, res) {
        res.json({
            status: 'login shit'
        });
    });

    // Determine if there is an active session.
    // This may not be needed.
    server.get('/session', passportController.isAuthenticated, sessionController);

    // Third-party authentication
    server.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    server.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    
    server.get('/auth/github', passport.authenticate('github'));
    server.get('/auth/github/callback', passport.authenticate('github', {
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

    // Route all other requests to the base controller.
    server.get('*', baseController);
};
/**
 * Sub-router for /users paths.
 *
 * Note that because this is a "sub-router",
 * and we initialized it with app.use('/users', userRouter),
 * all paths defined here will have '/users'
 * preceding them.
 * For example, router.get('/session', ...)
 * is actually creating the path: '/users/session'.
 * 
 * See http://expressjs.com/4x/api.html#router
 * for more information about this technique.
 */

var express             = require('express'),
    router              = express.Router(),
    loginController     = require('../controllers/users/loginController'),
    logoutController    = require('../controllers/users/logoutController'),
    signupController    = require('../controllers/users/signupController'),
    sessionController   = require('../controllers/users/sessionController'),
    passportController  = require('../controllers/passportController');

// Determine if there is an active session
router.get('/session', passportController.isAuthenticated, sessionController);

// Activate a local user's account
router.get('/activate/:key', signupController.activateUser);

// Create a local user account
router.post('/sign-up', signupController.createUser);

// Log in to a local user account
router.post('/sign-in', loginController);

// End the current session
router.post('/sign-out', logoutController);

module.exports = router;
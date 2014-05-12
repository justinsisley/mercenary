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
    passwordController  = require('../controllers/users/passwordController'),
    passportController  = require('../controllers/passportController');

// Determine if there is an active session.
router.get('/session', passportController.isAuthenticated, sessionController);

// Activate a local user's account.
router.get('/activate/:key', signupController.activateUser);

// Create a local user account.
router.post('/signup', signupController.createUser);

// Log in to a local user account.
router.post('/signin', loginController);

// End the current session.
router.post('/signout', logoutController);

// Change the user's password.
router.post('/updatepassword', passwordController.updatePassword);

module.exports = router;
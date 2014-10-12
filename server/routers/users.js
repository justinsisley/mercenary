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

var express             = require('express');
var router              = express.Router();
var loginController     = require('../controllers/users/login');
var logoutController    = require('../controllers/users/logout');
var signupController    = require('../controllers/users/signup');
var sessionController   = require('../controllers/users/session');
var passwordController  = require('../controllers/users/password');
var passportController  = require('../controllers/passport');

// Determine if there is an active session.
router.get('/session', passportController.isAuthenticated, sessionController);

// Activate a local user's account.
router.get('/activate/:key', signupController.activateUser);

// Re-send activation email
router.post('/activation/resend', signupController.resendActivation);

// Create a local user account.
router.post('/signup', signupController.createUser);

// Log in to a local user account.
router.post('/signin', loginController);

// End the current session.
router.post('/logout', logoutController);

// Change the user's password.
router.post('/updatepassword', passwordController.updatePassword);

module.exports = router;
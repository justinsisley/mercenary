/**
 * Sub-router for /proxy paths.
 *
 * Note that because this is a "sub-router",
 * and we initialized it with app.use('/proxy', proxyRouter),
 * all paths defined here will have '/proxy'
 * preceding them.
 * For example, router.get('/users', ...)
 * is actually creating the path: '/proxy/users'.
 *
 * See http://expressjs.com/4x/api.html#router
 * for more information.
 */

var express             = require('express');
var router              = express.Router();
var proxyController     = require('../controllers/proxy');
var passportController  = require('../controllers/passport');

// User must be authenticated for all proxy routes.
router.use(passportController.isAuthenticated);

router.use('*', proxyController);

module.exports = router;
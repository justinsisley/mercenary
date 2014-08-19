/**
 * Sub-router for /api paths.
 *
 * This exists purely as an example.
 * You might use this router in conjunction
 * with API controllers to make direct
 * calls to the DB, or to interface with
 * a separate API server.
 *
 * Note that because this is a "sub-router",
 * and we initialized it with app.use('/api', apiRouter),
 * all paths defined here will have '/api'
 * preceding them.
 * For example, router.get('/test', ...)
 * is actually creating the path: '/api/test'.
 * 
 * See http://expressjs.com/4x/api.html#router
 * for more information about this technique.
 */

var express             = require('express');
var router              = express.Router();
var passportController  = require('../controllers/passport');

// User must be authenticated for all API routes.
router.use(passportController.isAuthenticated);

router.get('/test', function(req, res) {
    return res.json({
        status: 'success'
    });
});

module.exports = router;
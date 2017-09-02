const router = require('express').Router();
const tokenpress = require('tokenpress');
const sessionController = require('../controllers/session');

const { requireAuth } = tokenpress.node.middleware;

router.post('/session', sessionController.loginTokenRequestHandler);
router.post('/session/token', sessionController.sessionTokenRequestHandler);
router.get('/session/verify', requireAuth, sessionController.verifySessionTokenHandler);

// 404 for all unmatched API paths
router.use('/*', (req, res) => {
  res.status(404).json({});
});

module.exports = router;

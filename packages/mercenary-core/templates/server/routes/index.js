const router = require('express').Router();
const sessionController = require('../controllers/session');

router.use(sessionController);

// 404 for all unmatched API paths
router.use('/*', (req, res) => {
  res.status(404).json({});
});

module.exports = router;

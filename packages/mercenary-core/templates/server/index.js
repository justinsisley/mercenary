const router = require('express').Router();
const mongoose = require('mongoose');
const tokenpress = require('tokenpress');
const config = require('./config');
const sessionController = require('./controllers/session');

// Initialize MongoDB
const mlab = config.mlab;
mongoose.Promise = global.Promise;
// HACK: Prevents problems with re-creating DB connection when "hot-reloading"
try {
  mongoose.connect(`mongodb://${mlab.username}:${mlab.password}@${mlab.server}`);
} catch (error) {
  // no-op
}

// Configure JWT authentication middleware and utils
tokenpress.node.configure({
  secret: config.jwt.secret,
  expiresIn: config.jwt.expiresIn,
});

// Register controllers with the root router
router.use(sessionController);

// 404 for all unmatched API paths
router.use('/*', (req, res) => { res.status(404).json({}); });

module.exports = router;

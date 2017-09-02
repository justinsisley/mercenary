const router = require('express').Router();
const mongoose = require('mongoose');
const tokenpress = require('tokenpress');
const config = require('./config');
const routes = require('./routes');

// Initialize MongoDB
const { username, password, server } = config.mlab;
mongoose.Promise = global.Promise;
// HACK: Prevents problems with re-creating DB connection when "hot-reloading"
try {
  mongoose.connect(`mongodb://${username}:${password}@${server}`);
} catch (error) {
  // no-op
}

// Configure JWT authentication middleware and utils
tokenpress.node.configure({
  secret: config.jwt.secret,
  expiresIn: config.jwt.expiresIn,
});

// Register routes
router.use(routes);

module.exports = router;

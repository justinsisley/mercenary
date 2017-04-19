const router = require('express').Router;
const mongoose = require('mongoose');
const tokenpress = require('tokenpress');
const config = require('./config');
const authController = require('./controllers/auth');
const accountController = require('./controllers/account');

// Configure MongoDB
const mlab = config.mlab;
mongoose.Promise = global.Promise;
// HACK: Prevents problems with re-creating DB connection when "hot-reloading"
try {
  mongoose.connect(`mongodb://${mlab.username}:${mlab.password}@${mlab.server}`);
} catch (error) {
  // no-op
}

// Configure JWT authentication middleware and utils
tokenpress.configure({
  secret: config.jwt.secret,
  expiresIn: config.jwt.expiresIn,
});

// Create main application router
const rootRouter = router();

// Register controllers
rootRouter.use(authController);
rootRouter.use(accountController);

module.exports = rootRouter;

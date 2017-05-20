const path = require('path');
const generatePassword = require('password-generator');

// Handle config.js overrides
const cwd = process.cwd();
const projectConfigPath = path.join(cwd, './config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

// Create fallback credentials for netdata
const randomInt = (min, max) => Math.floor(Math.random() * (max - (min + 1))) + min;
const netdataUsername = generatePassword(randomInt(18, 32), false);
const netdataPassword = generatePassword(randomInt(18, 32), false);

module.exports = {
  env: process.env.NODE_ENV || 'development',

  // The Express server's port
  expressPort: process.env.EXPRESS_PORT || 3325,

  // The webpack dev server's port
  webpackDevServerPort: process.env.WEBPACK_DEV_SERVER_PORT || 3326,

  // Length of time to cache static assets in production mode
  maxAge: process.env.CACHE_MAX_AGE || 1000 * 60 * 60 * 24 * 60, // 60 days

  // Redis configuration for rate limiting
  redis: {
    host: process.env.REDIS_HOST || projectConfig.redis.host,
    port: process.env.REDIS_PORT || projectConfig.redis.port,
  },

  // Configure access to netdata dashboard
  netdata: {
    username: process.env.NETDATA_USERNAME || projectConfig.deploy.netdata.username || netdataUsername,
    password: process.env.NETDATA_PASSWORD || projectConfig.deploy.netdata.password || netdataPassword,
  },
};

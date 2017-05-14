const path = require('path');
const generatePassword = require('password-generator');

// Handle config.js overrides
const cwd = process.cwd();
const projectConfigPath = path.join(cwd, './config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

// Create difficult-to-guess default credentials for netdata
const randomInt = (min, max) => Math.floor(Math.random() * (max - (min + 1))) + min;
const netdataUsername = generatePassword(randomInt(12, 32), false);
const netdataPassword = generatePassword(randomInt(12, 32), false);

module.exports = {
  env: process.env.NODE_ENV || 'development',

  // The Express server's port
  expressPort: process.env.EXPRESS_PORT || 3325,

  // The webpack dev server's port
  webpackDevServerPort: process.env.WEBPACK_DEV_SERVER_PORT || 3326,

  // Length of time to cache static assets in production mode
  maxAge: process.env.CACHE_MAX_AGE || 1000 * 60 * 60 * 24 * 60, // 60 days

  netdata: {
    // eslint-disable-next-line
    username: process.env.NETDATA_USERNAME || projectConfig.deploy.netdata.username || netdataUsername,
    // eslint-disable-next-line
    password: process.env.NETDATA_PASSWORD || projectConfig.deploy.netdata.password || netdataPassword,
  },
};

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

  // The hostname to use when deployed
  hostname: process.env.APP_HOSTNAME || projectConfig.deploy.hostname,

  // Settings for the www subdomain
  www: process.env.WWW || projectConfig.deploy.www,

  // Configure node-toobusy values for graceful server failover
  failover: {
    maxLag: process.env.FAILOVER_MAX_LAG || projectConfig.deploy.failover.maxLag,
    interval: process.env.FAILOVER_INTERVAL || projectConfig.deploy.failover.interval,
  },

  // Configure Loggly for production server logs
  loggly: {
    token: process.env.LOGGLY_TOKEN || projectConfig.deploy.loggly.token,
    subdomain: process.env.LOGGLY_SUBDOMAIN || projectConfig.deploy.loggly.subdomain,
  },

  // Configure access to netdata dashboard
  netdata: {
    username: process.env.NETDATA_USERNAME || projectConfig.deploy.netdata.username || netdataUsername,
    password: process.env.NETDATA_PASSWORD || projectConfig.deploy.netdata.password || netdataPassword,
  },
};

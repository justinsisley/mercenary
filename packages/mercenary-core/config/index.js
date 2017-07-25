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

  // Hostname
  hostname: process.env.HOSTNAME || projectConfig.deploy.hostname,

  // Force www
  www: process.env.WWW || projectConfig.deploy.www,

  // Configure access to netdata dashboard
  netdata: {
    username: process.env.NETDATA_USERNAME || projectConfig.deploy.netdata.username || netdataUsername,
    password: process.env.NETDATA_PASSWORD || projectConfig.deploy.netdata.password || netdataPassword,
  },
};

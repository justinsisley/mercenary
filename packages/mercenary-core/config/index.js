const path = require('path');
const marshall = require('marshall/index');
const generatePassword = require('password-generator');

// Handle config.js overrides
const cwd = process.cwd();
const projectConfigPath = path.join(cwd, './config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

// Create difficult-to-guess default credentials for netdata
const randomInt = (min, max) => Math.floor(Math.random() * (max - (min + 1))) + min;
const netdataUsername = generatePassword(randomInt(12, 32), false);
const netdataPassword = generatePassword(randomInt(12, 32), false);

// Configuration schema
const config = marshall({
  env: {
    doc: 'The environment',
    format: String,
    default: projectConfig.app.env || 'development',
    env: 'ENV',
    arg: 'env',
  },
  expressPort: {
    doc: 'The Express server\'s port',
    format: 'port',
    default: 3325,
    env: 'EXPRESS_PORT',
    arg: 'express-port',
  },
  webpackDevServerPort: {
    doc: 'The webpack dev server\'s port',
    format: 'port',
    default: 3326,
    env: 'WEBPACK_DEV_SERVER_PORT',
    arg: 'webpackDevServerPort',
  },
  proxyApi: {
    doc: 'The remote API to proxy to',
    format: String,
    default: projectConfig.app.proxyApi || '',
    env: 'PROXY_API',
    arg: 'proxy-api',
  },
  maxAge: {
    doc: 'Length of time to cache static assets in production mode',
    format: 'nat',
    default: 1000 * 60 * 60 * 24 * 60, // 60 days
    env: 'CACHE_MAX_AGE',
    arg: 'cache-max-age',
  },
  netdata: {
    username: {
      doc: 'The HTTP auth username for the netdata application',
      format: String,
      default: projectConfig.deploy.netdata.username || netdataUsername,
      env: 'NETDATA_USERNAME',
      arg: 'netdata-username',
    },
    password: {
      doc: 'The HTTP auth password for the netdata application',
      format: String,
      default: projectConfig.deploy.netdata.password || netdataPassword,
      env: 'NETDATA_PASSWORD',
      arg: 'netdata-password',
    },
  },
});

module.exports = config;

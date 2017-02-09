const path = require('path');
const marshall = require('marshall/index');

// Handle config.js overrides
const cwd = process.cwd();
const projectConfigPath = path.join(cwd, './mercenary.config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

// Configuration schema
const config = marshall({
  env: {
    doc: 'The environment',
    format: String,
    default: projectConfig.env || 'development',
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
    default: projectConfig.proxyApi || '',
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
});

module.exports = config;

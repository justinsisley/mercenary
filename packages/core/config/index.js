const utils = require('../utils');

const config = Object.assign(
  {},
  {
    expressPort: 3325,
    webpackDevServerPort: 3326,
  },
  utils.projectConfig,
  process.env,
  {
    env: process.env.NODE_ENV || 'development',
  }
);

console.log('config', config);

module.exports = config;

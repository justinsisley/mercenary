const utils = require('../utils');

module.exports = {
  env: process.env.NODE_ENV || 'development',

  // Not configurable
  expressPort: 3325,
  webpackDevServerPort: 3326,

  // Bring in host project's config.js
  ...utils.projectConfig,
  // Bring in environment variables
  ...process.env,
};

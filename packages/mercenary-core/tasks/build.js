const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');
const webpack = require.resolve('.bin/webpack');
const maxMemory = 449;

// Production build
const build = (config = { silent: false }) => {
  cp.execSync(`
    rm -rf ${cwd}/public &&
    NODE_ENV=production node --max_old_space_size=${maxMemory} "${webpack}" \
      --display-error-details \
      --config \
      "${configDir}/webpack/production.js"
  `, { stdio: config.silent ? 'ignore' : 'inherit' });
};

module.exports = build;

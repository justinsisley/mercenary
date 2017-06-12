const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');
const webpack = require.resolve('.bin/webpack');

// Production build
const build = (config = { silent: false }) => {
  let output = '';

  if (config.silent) {
    output = '>/dev/null';
  }

  cp.execSync(`
    rm -rf ${cwd}/public &&
    NODE_ENV=production "${webpack}" \
      --display-error-details \
      --config \
      "${configDir}/webpack/production.js" ${output}
  `, { stdio: 'inherit' });
};

module.exports = build;

const path = require('path');
const cp = require('child_process');
const startProd = require('./startProd');
const buildStatic = require('./buildStatic');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');
const webpack = require.resolve('.bin/webpack');

// Production build
const build = (config = { silent: false, static: false }) => {
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

  if (config.static) {
    // Start the production server in "static" mode, which bypasses some of the
    // standard production settings (force WWW, etc.)
    const prod = startProd({
      async: true,
      mode: 'static',
    });

    // Give the server a moment to start
    setTimeout(() => {
      // Run the static builder
      buildStatic();

      // Kill the server
      prod.kill('SIGINT');
    }, 2000);
  }
};

module.exports = build;

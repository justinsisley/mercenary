/* eslint-disable import/no-unresolved */

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const minify = require('html-minifier').minify;
const startProd = require('./startProd');
const buildStatic = require('./buildStatic');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');
const webpack = require.resolve('.bin/webpack');

// Production build
const build = (config = { silent: false, static: false }) => {
  const runBuild = () => {
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

    // Minify the index.html file
    const indexFile = fs.readFileSync(`${cwd}/public/index.html`, { encoding: 'utf8' });
    const minifiedIndexFile = minify(indexFile, {
      minifyJS: true,
      collapseWhitespace: true,
    });

    fs.writeFileSync(`${cwd}/public/index.html`, minifiedIndexFile);
  };

  if (config.static) {
    // Since the static build task is only really used during the deploy task,
    // using it will cause build to return a promise, since it's a bit difficult
    // to synchronously handle the static build.
    return new Promise((resolve) => {
      runBuild();

      // Start the production server in "static" mode, which bypasses some of the
      // standard production settings (force WWW, etc.)
      const prod = startProd({
        async: true,
        mode: 'static',
      });

      // Give the server a moment to start
      setTimeout(() => {
        // Run the static builder
        buildStatic().then(() => {
          // Kill the server
          prod.kill('SIGINT');

          resolve();
        });
      }, 2000);
    });
  }

  // If not using the static build task, just synchronously run the build
  runBuild();
  return null;
};

module.exports = build;

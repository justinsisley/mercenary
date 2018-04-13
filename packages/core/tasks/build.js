/* eslint-disable import/no-unresolved */
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const minify = require('html-minifier').minify;
const utils = require('../utils');
const startProd = require('./startProd');
const buildStatic = require('./buildStatic');
// const storybook = require('./storybook');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');
const webpack = require.resolve('.bin/webpack-cli');

// Production build
const build = (config = { silent: false, static: false }) => {
  const runBuild = () => {
    let output = '';

    if (config.silent) {
      output = '>/dev/null';
    }

    cp.execSync(`
      rm -rf ${cwd}/public &&
      NODE_ENV=production \
      BABEL_ENV=production \
      "${webpack}" \
        --display-error-details \
        --config \
        "${configDir}/webpack/production.js" ${output}
    `, { stdio: 'inherit' });

    // Minify the index.html file
    const indexFile = utils.readFileSync(`${cwd}/public/index.html`);
    const minifiedIndexFile = minify(indexFile, {
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true,
    });

    fs.writeFileSync(`${cwd}/public/index.html`, minifiedIndexFile);

    // Build storybook
    // FIXME: this is a side effect... no good
    // storybook.build();
  };

  if (config.static) {
    // Since the static build task is only really used during the deploy task,
    // using it will cause build to return a promise, since it's a bit difficult
    // to synchronously handle the static build.
    return new Promise((resolve) => {
      runBuild();

      // Add STATIC_RENDER boolean to window as a UI helper. This allows the UI to
      // make decisions based on whether or not this is a static render. This is
      // especially useful for animations that shouldn't be pre-rendered.
      let content = utils.readFileSync(`${cwd}/public/index.html`);
      content = content.replace('</head>', '<script>window.STATIC_RENDER = true;</script></head>');
      fs.writeFileSync(`${cwd}/public/index.html`, content);

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

          // Remove STATIC_RENDER boolean from the final code
          content = utils.readFileSync(`${cwd}/public/index.html`);
          content = content.replace('<script>window.STATIC_RENDER = true;</script>', '');
          fs.writeFileSync(`${cwd}/public/index.html`, content);

          resolve();
        });
      }, 3000);
    });
  }

  // If not using the static build task, just synchronously run the build
  runBuild();

  return null;
};

module.exports = build;

/* eslint-disable import/no-unresolved */
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const minify = require('html-minifier').minify;
const utils = require('../utils');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');
const webpack = require.resolve('.bin/webpack-cli');

// Production build analysis
const analyze = () => {
  cp.execSync(`
    rm -rf ${cwd}/public &&
    NODE_ENV=production \
    BABEL_ENV=production \
    "${webpack}" \
      --display-error-details \
      --config \
      "${configDir}/webpack/analyze.js"
  `, { stdio: 'inherit' });

  // Minify the index.html file
  const indexFile = utils.readFileSync(`${cwd}/public/index.html`);
  const minifiedIndexFile = minify(indexFile, {
    minifyCSS: true,
    minifyJS: true,
    collapseWhitespace: true,
  });

  fs.writeFileSync(`${cwd}/public/index.html`, minifiedIndexFile);
};

module.exports = analyze;

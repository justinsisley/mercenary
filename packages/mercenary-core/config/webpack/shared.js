const path = require('path');
const webpack = require('webpack');

// Directories of interest
const cwd = process.cwd();
const clientDir = path.join(cwd, './client');
const staticDir = path.join(cwd, './static');

// Files of interest
const jsEntryPoint = path.join(clientDir, '/index');
const htmlSource = path.join(clientDir, '/index.html');
const htmlCompiled = path.join(staticDir, '/index.html');

// Developers' custom config.js
const projectConfigPath = path.join(cwd, './config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

// Globals for webpack
var javaScriptGlobals = null; // eslint-disable-line
if (projectConfig.webpack && projectConfig.webpack.globals) {
  javaScriptGlobals = new webpack.ProvidePlugin(projectConfig.webpack.globals);
}

// Regexes we'll use for loaders
const regex = {
  javascript: /\.jsx?$/,
  css: /\.css$/,
  images: /\.(jpe?g|png|gif|svg(2)?)(\?v=[a-z0-9.]+)?$/,
  fonts: /\.(ttf|eot|svg|woff(2)?)(\?v=[a-z0-9.]+)?$/,
  client: /client/,
  server: /server/,
  node_modules: /node_modules/,
};

module.exports = {
  cwd,
  clientDir,
  staticDir,
  jsEntryPoint,
  htmlSource,
  htmlCompiled,
  javaScriptGlobals,
  regex,
};

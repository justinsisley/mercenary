const path = require('path');
const webpack = require('webpack');

// Directories of interest
const cwd = process.cwd();
const clientDir = path.join(cwd, './client');
const publicDir = path.join(cwd, './public');

// Files of interest
const jsEntryPoint = path.join(clientDir, '/index');
const htmlSource = path.join(clientDir, '/index.html');
const htmlCompiled = path.join(publicDir, '/index.html');

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

// Options affecting the webpack output
const output = {
  // The output directory
  path: publicDir,
  // The output.path from the view of the Javascript / HTML page
  publicPath: '/',
  // The filename of the entry chunk as relative path inside the output.path directory
  filename: 'js/[hash].js',
  // Determines the name of on-demand loaded chunk files
  chunkFilename: 'js/[chunkhash].js',
};

module.exports = {
  cwd,
  clientDir,
  publicDir,
  jsEntryPoint,
  htmlSource,
  htmlCompiled,
  javaScriptGlobals,
  regex,
  output,
};

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// Directories of interest
const cwd = process.cwd();
const clientDir = path.join(cwd, './client');
const publicDir = path.join(cwd, './public');

// Get the version from the host projects's package.json
const packageJson = fs.readFileSync(`${cwd}/package.json`, { encoding: 'utf8' });
const semver = JSON.parse(packageJson).version;

// Files of interest
const jsEntryPoint = path.join(clientDir, '/index');
const htmlSource = path.join(clientDir, '/index.html');
const htmlCompiled = path.join(publicDir, '/index.html');
const manifestIcon = path.join(clientDir, '/icon.png');

// Host project's config.js
const projectConfigPath = path.join(cwd, './config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

// Get the manifest settings from the host project's config.js
const { manifest } = projectConfig;
// Add the icon from the host project's client directory to the manifest
manifest.icons = [{
  src: manifestIcon,
  sizes: [48, 72, 96, 144, 168, 192, 512],
  destination: 'icons',
}];

// Globals for webpack
var javaScriptGlobals = null; // eslint-disable-line
if (projectConfig.webpack && projectConfig.webpack.globals) {
  javaScriptGlobals = new webpack.ProvidePlugin(projectConfig.webpack.globals);
}

// Regexes we'll use for loaders
const regex = {
  javascript: /\.jsx?$/,
  css: /\.css$/,
  bitmaps: /\.(jpe?g|png|gif)(\?v=[a-z0-9.]+)?$/,
  svg: /\.svg$/,
  fonts: /\.(ttf|eot|woff(2)?)(\?v=[a-z0-9.]+)?$/,
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
  // Determines the name of on-demand loaded chunk files.
  // This works in conjunction with the bundle-splitting pattern used in the client.
  chunkFilename: 'js/[chunkhash].js',
};

module.exports = {
  cwd,
  clientDir,
  publicDir,
  semver,
  jsEntryPoint,
  htmlSource,
  htmlCompiled,
  manifestIcon,
  javaScriptGlobals,
  manifest,
  regex,
  output,
};

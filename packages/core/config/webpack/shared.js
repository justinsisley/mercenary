/* eslint-disable import/no-unresolved */
const path = require('path');
const webpack = require('webpack');
const config = require('../index');
const utils = require('../../utils');

// Directories of interest
const cwd = process.cwd();
const clientDir = path.join(cwd, './client');
const publicDir = path.join(cwd, './public');

// Get the version from the host projects's package.json
const semver = utils.packageJSON.version;

// Files of interest
const jsEntryPoint = path.join(clientDir, '/index');
const htmlSource = path.join(clientDir, '/index.html');
const htmlCompiled = path.join(publicDir, '/index.html');
const favicon = path.join(clientDir, '/icon.png');

// Globals for webpack
let javaScriptGlobals = null;
if (config.webpack && config.webpack.ProvidePlugin) {
  javaScriptGlobals = new webpack.ProvidePlugin(config.webpack.ProvidePlugin);
}

// Regexes we'll use for loaders
const regex = {
  javascript: /\.jsx?$/,
  css: /\.css$/,
  bitmaps: /\.(jpe?g|png|gif)(\?v=[a-z0-9.]+)?$/,
  svg: /\.svg$/,
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
  filename: 'static/js/[hash].js',
  // Determines the name of on-demand loaded chunk files.
  // This works in conjunction with the bundle-splitting pattern used in the client.
  chunkFilename: 'static/js/[chunkhash].js',
};

const loaders = {
  // Bitmap images
  bitmapImages: {
    test: regex.bitmaps,
    include: [regex.node_modules, regex.client],
    loader: 'file-loader',
    options: {
      name: 'static/images/[hash].[ext]',
    },
  },
  // Inlined SVG images
  svgImages: {
    test: regex.svg,
    include: regex.client,
    loader: 'svg-inline-loader?classPrefix',
  },
  // Fonts
  fonts: {
    test: regex.fonts,
    include: regex.node_modules,
    loader: 'file-loader',
    options: {
      name: 'static/fonts/[name].[ext]',
    },
  },
};

const faviconsWebpackPlugin = {
  logo: favicon,
  // The prefix for all image files
  prefix: 'static/icons/',
  // Inject the html into the html-webpack-plugin
  inject: true,
  // Which icons should be generated
  // (see https://github.com/haydenbleasel/favicons#usage)
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false,
  },
};

module.exports = {
  cwd,
  clientDir,
  publicDir,
  semver,
  jsEntryPoint,
  htmlSource,
  htmlCompiled,
  javaScriptGlobals,
  regex,
  output,
  loaders,
  faviconsWebpackPlugin,
};

/* eslint-disable import/no-unresolved */
const webpack = require('webpack');
// const WebappWebpackPlugin = require('webapp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../index');
const shared = require('./shared');

const webpackDevServerPort = config.webpackDevServerPort;

module.exports = {
  mode: 'development',

  // The entry point for the bundle
  entry: [
    `webpack-dev-server/client?http://localhost:${webpackDevServerPort}`,
    'webpack/hot/only-dev-server',
    shared.jsEntryPoint,
  ],

  // Options affecting the output
  output: shared.output,

  // Options affecting the normal modules
  module: {
    rules: [
      // JavaScript and JSX
      {
        test: shared.regex.javascript,
        include: [shared.regex.client, shared.regex.server],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      // CSS modules, including CSS from node_modules
      {
        test: shared.regex.css,
        include: [shared.regex.client, shared.regex.node_modules],
        use: ['style-loader', 'css-loader'],
      },
      shared.loaders.bitmapImages,
      shared.loaders.svgImages,
      shared.loaders.fonts,
    ],
  },

  // Additional plugins for the compiler
  plugins: [
    // Define globals for compilation
    new webpack.DefinePlugin({
      // Version from the host projects's package.json
      __VERSION__: JSON.stringify(shared.semver),
      'process.env.NODE_ENV': '"development"',
    }),

    // Enables Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Skips the emitting phase when there are errors during compilation
    new webpack.NoEmitOnErrorsPlugin(),

    // Generate and inject favicon
    // new WebappWebpackPlugin(shared.faviconsWebpackPlugin),

    // Inject generated assets into HTML file
    new HtmlWebpackPlugin({
      template: shared.htmlSource,
    }),
  ],

  // Make web variables accessible to webpack, e.g. window
  target: 'web',

  // Generate a source map
  devtool: 'cheap-module-eval-source-map',
};

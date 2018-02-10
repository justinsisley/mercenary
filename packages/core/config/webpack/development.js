/* eslint-disable import/no-unresolved */
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('eslint/lib/formatters/stylish');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const config = require('../index');
const shared = require('./shared');

const webpackDevServerPort = config.webpackDevServerPort;

module.exports = {
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
      // ESLint
      {
        test: shared.regex.javascript,
        enforce: 'pre',
        include: shared.regex.client,
        loader: 'eslint-loader',
        options: {
          formatter: eslintFormatter,
        },
      },
      // JavaScript and JSX
      {
        test: shared.regex.javascript,
        include: [shared.regex.client, shared.regex.server],
        loader: 'babel-loader',
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
    // JavaScript runtime globals
    shared.javaScriptGlobals,

    // Define globals for compilation
    new webpack.DefinePlugin({
      // Version from the host projects's package.json
      __VERSION__: JSON.stringify(shared.semver),
      'process.env.NODE_ENV': '"development"',
    }),

    // Log flow errors
    new FlowStatusWebpackPlugin({
      onError(stdout) {
        console.log(stdout);
      },
      // eslint-disable-next-line
      binaryPath: require('flow-bin'),
    }),

    // Enables Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Skips the emitting phase when there are errors during compilation
    new webpack.NoEmitOnErrorsPlugin(),

    // Generate and inject favicon
    new FaviconsWebpackPlugin(shared.faviconsWebpackPlugin),

    // Inject generated assets into HTML file
    new HtmlWebpackPlugin({
      template: shared.htmlSource,
    }),

  // Filter out boolean values, which prevents an error if no JS globals are
  // defined, meaning `shared.javaScriptGlobals` is falsey.
  ].filter(Boolean),

  // Make web variables accessible to webpack, e.g. window
  target: 'web',

  // Generate a source map
  devtool: 'cheap-module-eval-source-map',
};

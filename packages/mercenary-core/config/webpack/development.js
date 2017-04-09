const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('eslint/lib/formatters/stylish');
const config = require('../index');
const shared = require('./shared');

const webpackDevServerPort = config.get('webpackDevServerPort');

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
      // CSS modules
      {
        test: shared.regex.css,
        include: shared.regex.client,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      // Vendor CSS from NPM
      {
        test: shared.regex.css,
        include: shared.regex.node_modules,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      // Images
      {
        test: shared.regex.images,
        include: [shared.regex.node_modules, shared.regex.client],
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      // Fonts
      {
        test: shared.regex.fonts,
        include: [shared.regex.node_modules, shared.regex.client],
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },

  // Additional plugins for the compiler
  plugins: [
    // JavaScript runtime globals
    shared.javaScriptGlobals,

    // Enables Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Skips the emitting phase when there are errors during compilation
    new webpack.NoEmitOnErrorsPlugin(),

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

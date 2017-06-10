const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('eslint/lib/formatters/stylish');
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
      // Bitmap images
      {
        test: shared.regex.bitmaps,
        include: [shared.regex.node_modules, shared.regex.client],
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      // SVG images
      {
        test: shared.regex.svg,
        include: [shared.regex.node_modules, shared.regex.client],
        loader: 'svg-inline-loader?classPrefix',
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

    // Define globals for compilation
    new webpack.DefinePlugin({
      // Version from the host projects's package.json
      __VERSION__: JSON.stringify(shared.semver),
    }),

    // Enables Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Skips the emitting phase when there are errors during compilation
    new webpack.NoEmitOnErrorsPlugin(),

    // Generate and inject favicon
    new FaviconsWebpackPlugin({
      logo: shared.manifestIcon,
      // The prefix for all image files
      prefix: 'icons/',
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
    }),

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
  devtool: 'eval',
};

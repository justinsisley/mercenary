const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('eslint/lib/formatters/stylish');
const config = require('../index');

const webpackDevServerPort = config.get('webpackDevServerPort');

// Directories of interest
const cwd = process.cwd();
const clientDir = path.join(cwd, './client');

// Developers' custom config.js
const projectConfigPath = path.join(cwd, './config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

// Globals for webpack
var javaScriptGlobals = null; // eslint-disable-line
if (projectConfig.webpack && projectConfig.webpack.globals) {
  javaScriptGlobals = new webpack.ProvidePlugin(projectConfig.webpack.globals);
}

module.exports = {
  // The entry point for the bundle
  entry: [
    `webpack-dev-server/client?http://localhost:${webpackDevServerPort}`,
    'webpack/hot/only-dev-server',
    // JavaScript entry point
    path.join(cwd, './client/index'),
  ],

  // Options affecting the output
  output: {
    // The output directory
    path: path.join(__dirname, 'static'),
    // The filename of the entry chunk as relative path inside the
    // output.path directory
    filename: 'js/app.js',
    // The output.path from the view of the Javascript / HTML page
    publicPath: '/',
  },

  // Generate a source map
  devtool: 'inline-source-map',

  // Options affecting the normal modules
  module: {
    rules: [
      // ESLint
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        include: /client/,
        loader: 'eslint-loader',
        options: {
          formatter: eslintFormatter,
        },
      },
      // JavaScript and JSX
      {
        test: /\.jsx?$/,
        include: [/client/, /server/],
        loader: 'babel-loader',
      },
      // CSS modules
      {
        test: /\.css$/,
        include: /client/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:7]',
            },
          },
        ],
      },
      // Vendor CSS from NPM
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      // Images
      {
        test: /\.(jpe?g|png|gif|svg(2)?)(\?v=[a-z0-9.]+)?$/,
        include: [/node_modules/, /clients/],
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      // Fonts
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[a-z0-9.]+)?$/,
        include: [/node_modules/, /clients/],
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
    javaScriptGlobals,
    // Enables Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // Skips the emitting phase when there are errors during compilation
    new webpack.NoEmitOnErrorsPlugin(),
    // Inject generated assets into HTML file
    new HtmlWebpackPlugin({
      template: path.join(clientDir, '/index.html'),
    }),
  ],

  // Make web variables accessible to webpack, e.g. window
  target: 'web',
};

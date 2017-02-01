const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('eslint/lib/formatters/stylish');
const config = require('../index');

const webpackDevServerPort = config.get('webpackDevServerPort');

// Directories of interest
const cwd = process.cwd();
const packageDirectory = path.join(__dirname, '../../');
const templatesDir = path.join(packageDirectory, '/templates');

// Files of interest
const javascriptEntryPoint = path.join(cwd, './client/index');

// Developers' custom config.js
const projectConfigPath = path.join(cwd, './config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

// Globals for webpack
var javaScriptGlobals = null; // eslint-disable-line
if (projectConfig.webpack && projectConfig.webpack.globals) {
  javaScriptGlobals = new webpack.ProvidePlugin(projectConfig.webpack.globals);
}

// Webpack-generated HTML file
const htmlEntryPoint = new HtmlWebpackPlugin({
  template: path.join(templatesDir, '/client/index.html'),
});

console.log(path.resolve('node_modules/babel-preset-mercenary'));

module.exports = {
  // The entry point for the bundle
  entry: [
    `webpack-dev-server/client?http://localhost:${webpackDevServerPort}`,
    'webpack/hot/only-dev-server',
    javascriptEntryPoint,
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
    // Enables Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Skips the emitting phase when there are errors during compilation
    new webpack.NoEmitOnErrorsPlugin(),
    // Add entry point and globals
    htmlEntryPoint,
    javaScriptGlobals,
  ],

  // Make web variables accessible to webpack, e.g. window
  target: 'web',
};

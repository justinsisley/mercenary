const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Directories of interest
const cwd = process.cwd();
const clientDir = path.join(cwd, './client');
const staticDir = path.join(cwd, './static');

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
  entry: path.join(clientDir, '/index'),

  // Options affecting the output
  output: {
    // The output directory
    path: staticDir,
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: '/js/[hash].js',
  },

  // Options affecting the normal modules
  module: {
    rules: [
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
        }),
      },
      // Vendor CSS from NPM
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
        }),
      },
      // Images
      {
        test: /\.(jpe?g|png|gif|svg(2)?)(\?v=[a-z0-9.]+)?$/,
        include: [/node_modules/, /clients/],
        loader: 'file-loader',
        options: {
          name: '/images/[hash].[ext]',
        },
      },
      // Fonts
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[a-z0-9.]+)?$/,
        include: [/node_modules/, /clients/],
        loader: 'file-loader',
        options: {
          name: '/fonts/[hash].[ext]',
        },
      },
    ],
  },

  // Additional plugins for the compiler
  plugins: [
    // JavaScript runtime globals
    javaScriptGlobals,
    // Define globals for compilation
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Minify JavaScript
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: true,
    }),
    // Extract CSS into a separate file
    new ExtractTextPlugin({
      filename: '/css/[contenthash].css',
    }),
    // Minify CSS
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.optimize\.css$/g,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
    // Copy HTML file and inject generated assets
    new HtmlWebpackPlugin({
      filename: path.join(staticDir, '/index.html'),
      template: path.join(clientDir, '/index.html'),
    }),
  ],

  // Make web variables accessible to webpack, e.g. window
  target: 'web',
};

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const shared = require('./shared');

module.exports = {
  // The entry point for the bundle
  entry: shared.jsEntryPoint,

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
      },
      // CSS modules
      {
        test: shared.regex.css,
        include: shared.regex.client,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      // Vendor CSS from NPM
      {
        test: shared.regex.css,
        include: shared.regex.node_modules,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      // Images
      {
        test: shared.regex.images,
        include: [shared.regex.node_modules, shared.regex.client],
        loader: 'file-loader',
        options: {
          name: 'images/[hash].[ext]',
        },
      },
      // Fonts
      {
        test: shared.regex.fonts,
        include: [shared.regex.node_modules, shared.regex.client],
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
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
      filename: 'css/[contenthash].css',
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
      filename: shared.htmlCompiled,
      template: shared.htmlSource,
    }),
  // Filter out boolean values, which prevents an error if no JS globals are
  // defined, meaning `shared.javaScriptGlobals` is falsey.
  ].filter(Boolean),

  // Make web variables accessible to webpack, e.g. window
  target: 'web',
};

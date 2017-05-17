const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
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
      // Version from the host projects's package.json
      __VERSION__: JSON.stringify(shared.semver),
      // Useful to reduce the size of client-side libraries, e.g. react
      'process.env.NODE_ENV': '"production"',
    }),

    // Minify JavaScript
    new webpack.optimize.UglifyJsPlugin({ comments: false }),

    // Extract CSS into a separate file
    new ExtractTextPlugin({
      filename: 'css/[contenthash].css',
    }),

    // Minify CSS
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: false,
    }),

    // Copy HTML file and inject generated assets
    new HtmlWebpackPlugin({
      filename: shared.htmlCompiled,
      template: shared.htmlSource,
      inlineSource: '.css$',
    }),
    // Inline any CSS modules within the HTML file
    new HtmlWebpackInlineSourcePlugin(),

  // Filter out boolean values, which prevents an error if no JS globals are
  // defined, meaning `shared.javaScriptGlobals` is falsey.
  ].filter(Boolean),

  // Modify logging
  stats: {
    // Remove children information
    children: false,
    // Remove the hash of the compilation
    hash: false,
    // Set the maximum number of modules to be shown
    maxModules: 0,
    // Add public path information
    publicPath: false,
    // Add webpack version information
    version: false,
  },

  // Make web variables accessible to webpack, e.g. window
  target: 'web',
};

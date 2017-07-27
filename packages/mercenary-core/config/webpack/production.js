const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const ShakePlugin = require('webpack-common-shake').Plugin;
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
      // Append the service worker runtime to the JavaScript entry point for
      // OfflinePlugin to work
      {
        test: /client\/index\.js$/,
        loader: 'webpack-append',
        query: 'require("offline-plugin/runtime").install();',
      },
      // CSS modules, including CSS from node_modules
      {
        test: shared.regex.css,
        include: [shared.regex.client, shared.regex.node_modules],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
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
      // Useful to reduce the size of client-side libraries, e.g. react
      'process.env.NODE_ENV': '"production"',
    }),

    // Remove unused assignments to exports property
    new ShakePlugin(),

    // Enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Minify JavaScript
    new webpack.optimize.UglifyJsPlugin(),

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

    // Copy HTML file and inject generated assets
    new HtmlWebpackPlugin({
      filename: shared.htmlCompiled,
      template: shared.htmlSource,
      inject: 'head',
      inlineSource: '.css$',
    }),

    // Inject bundle with 'async' attribute
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),

    // Inline any CSS modules within the HTML file
    new HtmlWebpackInlineSourcePlugin(),

    // Generates a 'manifest.json'
    new WebpackPwaManifest(shared.manifest),

    // Cache webpack assets for offline capabilities
    new OfflinePlugin({
      autoUpdate: true,
      updateStrategy: 'all',
      version: shared.semver,
    }),

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

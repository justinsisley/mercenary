/* eslint-disable import/no-unresolved */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const production = require('./production');

const analyze = { ...production };

analyze.plugins.push(new BundleAnalyzerPlugin());

module.exports = analyze;

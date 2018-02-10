/* eslint-disable import/no-unresolved */
const JSDOM = require('jsdom').JSDOM;
const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const Storage = require('dom-storage');
const raf = require('raf');

require('css.escape');

// Create fake DOM
const dom = new JSDOM('<body></body>');

// Extend Node with fake dom properties
global.navigator = { userAgent: 'node.js' };
global.document = dom.window.document;
global.window = dom.window;
global.window.localStorage = new Storage();

// Polyfill requestAnimationFrame
raf.polyfill(global.window);

// Polyfill CSS.escape
global.window.CSS = global.window.CSS || {};
global.window.CSS.escape = global.CSS.escape;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

// Global test helpers
global.describe = mocha.describe;
global.it = mocha.it;
global.assert = chai.assert;
global.spy = sinon.spy;
global.stub = sinon.stub;

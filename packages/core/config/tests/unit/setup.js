/* eslint-disable import/no-unresolved */

const JSDOM = require('jsdom').JSDOM;
const mocha = require('mocha');
const chai = require('chai');
const Storage = require('dom-storage');

// Create fake DOM
const dom = new JSDOM('<body></body>');

// Extend Node with fake dom properties
global.navigator = { userAgent: 'node.js' };
global.document = dom.window.document;
global.window = dom.window;
global.window.localStorage = new Storage();

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

// Global test helpers
global.describe = mocha.describe;
global.it = mocha.it;
global.assert = chai.assert;

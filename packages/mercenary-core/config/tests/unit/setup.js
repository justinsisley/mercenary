const JSDOM = require('jsdom').JSDOM;
const mocha = require('mocha');
const chai = require('chai');
const localStorage = require('node-localstorage');

// Create fake DOM
const dom = new JSDOM('<body></body>');

// Extend Node with fake dom properties
global.navigator = { userAgent: 'node.js' };
global.document = dom.window.document;
global.window = document.defaultView;
global.window.localStorage = localStorage;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

// Global test helpers
global.describe = mocha.describe;
global.it = mocha.it;
global.assert = chai.assert;

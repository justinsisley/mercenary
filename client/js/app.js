/**
 * The core Marionette application.
 */
var Marionette = require('marionette');

// Import settings constants
var SETTINGS = require('constants/settings');

// Set primary region names
var mainRegion = 'main-region';
var testRegion = 'test-region';

// Import Dust.js/Marionette integration
require('dustMarionette');
// Import Dust helpers
require('dustHelpers');
// Import all compiled templates
require('templates');

// Create a Marionette application.
var App = new Marionette.Application();

// Create an object to act as a session store.
App.vars = {};

// Cache the body selector
var $body = $('body');

// Add the markup for the main region.
// The main region contains our various layouts.
$body.append($('<div>')
    .attr({id: mainRegion, class: mainRegion}));

// Add the main region to the application.
App.addRegions({mainRegion: '#' + mainRegion});

// If this is a test environment, add the markup
// for the test region, then add the test region
// to the application.
if (window.mocha || window.mochaPhantomJS) {
    $body.append($('<div>')
        .attr({id: testRegion, class: testRegion}));

    App.addRegions({testRegion: '#' + testRegion});
}

// Allow page title changes from anywhere in the application.
App.vent.on('domchange:title', function(title) {
    document.title = SETTINGS.APP_NAME + (title ? (' | ' + title) : '');

    // This is also a good time to scroll to the
    // top of the window.
    $('html, body').scrollTop(0);
});

module.exports = App;
/**
 * The core Marionette application.
 */
var Marionette  = require('marionette');

// Set primary region names
var mainRegion  = 'main-region';
var testRegion  = 'test-region';

// Import Dust.js/Marionette integration
require('dustMarionette');
// Import all compiled templates
require('templates');

// Create a Marionette application.
var App = new Marionette.Application();

// Create an object to act as a session store.
App.vars = {};

// Add the markup for the main region.
// The main region contains our various layouts.
$('body').append($('<div>')
    .attr({id: mainRegion, class: mainRegion}));

// Add the main region to the application.
App.addRegions({mainRegion: '#' + mainRegion});

// If this is a test environment, add the markup
// for the test region, then add the test region
// to the application.
if (window.mocha || window.mochaPhantomJS) {
    $('body').append($('<div>')
        .attr({id: testRegion, class: testRegion}));

    App.addRegions({testRegion: '#' + testRegion});
}

// Allow page title changes from anywhere in the application.
App.vent.on('domchange:title', function(title) {
    document.title = 'Mercenary' + (title ? (' | ' + title) : '');
});

module.exports = App;
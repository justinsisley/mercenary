/**
 * The application's core.
 */
define(function(require) {
    var Marionette = require('marionette');

    require('dustMarionette');
    require('templates');

    // Create a Marionette application.
    var App = new Marionette.Application();

    // Create an object to act as a session store.
    App.vars = {};

    // Add the markup for the main region.
    // The main region contains our various layouts.
    $('body').append($('<div>').attr({
        id: 'main-region',
        class: 'main-region'
    }));

    // Add the main region to the application.
    App.addRegions({mainRegion: '#main-region'});

    // If this is a test environment, add the markup
    // for the test region, then add the test region
    // to the application.
    if (window.mocha || window.mochaPhantomJS) {
        $('body').append($('<div>').attr({
            id: 'test-region',
            class: 'test-region'
        }));
        
        App.addRegions({testRegion: '#test-region'});
    }

    // Allow page title changes from anywhere in the application.
    App.vent.on('domchange:title', function(title) {
        document.title = 'Mercenary' + (title ? (' | ' + title) : '');
    });
    
    return App;
});
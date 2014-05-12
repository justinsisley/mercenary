/**
 * The application's core.
 */
define([
    'jquery',
    'underscore',
    'marionette',
    'dustMarionette',
    'templates'
], function(
    $,
    _,
    Marionette
) {
    // Create the initial markup we need and immediately insert
    // the elements into the DOM. By using Underscore's `map` method,
    // we're effectively just passing an array of DIVs to `append`,
    // which jQuery inserts as DocumentFragments.
    $('body').append(_.map([
        'main-content'
    ], function(name) {
        return $('<div>').attr({'id': name, 'class': name});
    }));

    // Create a new Marionette application
    var App = new Marionette.Application();

    // A place to store things
    App.vars = {};

    // Set up the application regions
    App.addRegions({
        mainContentRegion: '#main-content'
    });

    // Allow page title changes from anywhere in the application
    App.vent.on('domchange:title', function(title) {
        document.title = 'Mercenary' + ((title) ? (' | ' + title) : '');
    });

    // If this is a test environment, add the test region
    if (window.mocha || window.mochaPhantomJS) {
        $('body').append($('<div>').attr({'id': 'test-region', 'class': 'test-region'}));
        
        App.addRegions({testRegion: '#test-region'});
    }
    
    return App;
});
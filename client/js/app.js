/**
 * The application's core.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function(
    $,
    _,
    Backbone,
    Marionette
) {
    'use strict';

    // Create the initial markup we need and immediately insert
    // the elements into the DOM. By using Underscore's `map` method,
    // we're effectively just passing an array to `append`, and since
    // jQuery inserts an array of nodes as DocumentFragments, we only
    // cause a single reflow when creating the base layout.
    $('body').append(_.map([
        'main-content'
    ], function(name) {
        return $('<div>').attr({'id': name, 'class': name});
    }));

    // Create a new Marionette application
    var App = new Marionette.Application();

    // Set up the application regions
    App.addRegions({
        mainContentRegion : '#main-content'
    });

    // If this is a test environment, add the test region
    if (window.mocha || window.mochaPhantomJS) {
        $('body').append($('<div>').attr({'id': 'test-region', 'class': 'test-region'}));
        
        App.addRegions({testRegion: '#test-region'});
    }
    
    return App;
});
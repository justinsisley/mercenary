/**
 * Bootstraps the application
 */
define([
    'app',
    'modules/base/routers/baseRouter'
], function(
    App,
    BaseRouter
) {
    'use strict';

    // Bootstrap the application
    App.addInitializer(function() {
        // A place to store things
        App.vars = {};

        // Instantiate router(s)
        App.routers = {
            baseRouter : new BaseRouter()
        };

        // Start Backbone.history
        Backbone.history.start({
            root: '/',
            pushState: true
        });
    });

    App.start();

    return App;
});
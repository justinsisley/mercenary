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

        // Instantiate routers and start Backbone.history
        // last, otherwise it won't pick up an event
        // triggered by the baseController, which helps
        // set the appropriate sub-menu state upon page load.
        App.routers = {
            baseRouter : new BaseRouter()
        };

        Backbone.history.start({
            root: '/',
            pushState: true
        });
    });

    App.start();

    return App;
});
/**
 * Bootstrap the application
 */
define([
    'backbone',

    'app',
    'modules/base/routers/baseRouter'
], function(
    Backbone,
    
    App,
    BaseRouter
) {
    // Bootstrap the application
    App.addInitializer(function() {
        // Instantiate router
        App.router = new BaseRouter();

        // Start Backbone.history
        Backbone.history.start({pushState: true});
    });

    // Check for an existing session,
    // then start the application in the
    // appropriate state.
    $.get('/users/session').done(function(response) {
        // If the session fetch was successful,
        // put the returned user data in our local
        // object and navigate to the dashboard.
        if (response && response.user) {
            App.vars.user = response.user;
        }

        // We always start the app.
        App.start();
    });

    return App;
});
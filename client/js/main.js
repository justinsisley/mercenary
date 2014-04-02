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
    // Bootstrap the application
    App.addInitializer(function() {
        // A place to store things
        App.vars = {};

        // Instantiate router(s)
        App.routers = {
            baseRouter: new BaseRouter()
        };

        // Start Backbone.history
        Backbone.history.start({
            root: '/',
            pushState: true
        });
    });

    // Check for an existing session,
    // then start the application in the
    // appropriate state.
    $.ajax({
        url: '/session',
    }).always(function(response) {
        // We always start the app.
        App.start();

        // If the session fetch was successful,
        // put the returned user data in our local
        // object and navigate to the dashboard.
        if (response && response.status === 'success') {
            App.vars.user = response.user;
            
            Backbone.history.navigate('/dashboard', true);
        }
    });

    return App;
});
/**
 * Bootstrap the application
 */
define([
    'backbone',

    'app',
    'modules/base/routers/baseRouter',
    'modules/users/models/userModel'
], function(
    Backbone,
    
    App,
    BaseRouter,
    User
) {
    // Bootstrap the application
    App.addInitializer(function() {
        // Instantiate routers
        App.routers = {
            baseRouter: new BaseRouter()
        };

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
            App.vars.user = new User(response.user);
        }

        // We always start the app.
        App.start();
    });

    return App;
});
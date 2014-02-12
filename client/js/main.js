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
            baseRouter : new BaseRouter()
        };

        // Start Backbone.history
        Backbone.history.start({
            root: '/',
            pushState: true
        });

        // Check for an existing session
        $.ajax({
            url: '/session',
        }).done(function(response) {
            // if (response && response.status === 'success') {
                // Backbone.navigate('/dashboard', true);
            // }
            console.debug(response);
        });
    });

    App.start();

    return App;
});
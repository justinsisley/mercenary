/**
 * Bootstrap the application
 */
var Backbone    = require('backbone');
var App         = require('app');
var BaseRouter  = require('modules/base/routers/baseRouter');
var User        = require('modules/users/models/userModel');

// Bootstrap the application
App.addInitializer(function() {
    // Check for an existing session,
    // then start the application in the
    // appropriate state.
    $.get('/users/session')
    .always(function(response) {
        // If the session fetch was successful,
        // put the returned user data in our local
        // object and navigate to the dashboard.
        if (response && response.user) {
            App.vars.user = new User(response.user);
        }

        // Instantiate routers
        App.routers = {
            baseRouter: new BaseRouter()
        };

        // Start Backbone.history
        Backbone.history.start({pushState: true});
    });
});

App.start();

module.exports = App;
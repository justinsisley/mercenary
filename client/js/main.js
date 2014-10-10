/**
 * Bootstrap the application.
 */
var Backbone    = require('backbone');
var App         = require('app');
var routers     = require('shared/routers');
var User        = require('components/users/models/user');

require('helpers/linkHandler');
require('helpers/flags');

// Runs as soon as App.start() is called
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
        App.routers = routers.start();

        // Start Backbone.history
        // If a route succeeds with a match for the 
        // current URL, Backbone.history.start()
        // returns true. If no defined route matches
        // the current URL, it returns false.
        var pageFound = Backbone.history.start({pushState: true});

        // If the user navigated directly to a path
        // that isn't handled by a router, show a 404.
        if (!pageFound) {Backbone.history.navigate('/404', true);}
    });
});

App.start();

module.exports = App;
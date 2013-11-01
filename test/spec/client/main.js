define([
    'jquery',

    'main'
], function($, App) {
    describe('Application entry point', function() {
        it('should create a `vars` object for storing session data', function() {
            assert.isDefined(App.vars);
        });

        it('should create a `routers` object for router access', function() {
            assert.isDefined(App.routers);
        });

        it('should create the base router', function() {
            assert.isDefined(App.routers.baseRouter);
        });

        it('should configure and start Backbone.history', function() {
            assert.isDefined(Backbone.history.options);

            // If Backbone history has already been started,
            // attempting to start it again will cause an error
            // to be thrown.
            assert.throws(Backbone.history.start);
        });
    });
});
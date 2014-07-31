define(function(require) {
    var App = require('main');

    describe('Application entry point', function() {
        it('should create a `routers` object for router access', function(/*done*/) {
            assert.isDefined(App.routers);
        });

        // it('should create the base router', function() {
            // assert.isDefined(App.routers.baseRouter);
        // });

        it('should configure and start Backbone.history', function() {
            assert.isDefined(Backbone.history.options);

            // If Backbone history has already been started,
            // attempting to start it again will cause an error
            // to be thrown.
            assert.throws(Backbone.history.start);
        });
    });
});
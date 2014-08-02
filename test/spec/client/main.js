define(function(require) {
    var App = require('main');

    describe('Application entry point', function() {
        it('should create a `routers` object for router access', function(done) {
            // Need a delay to let the app start
            setTimeout(function() {
                assert.isDefined(App.routers);

                done();
            }, 0);
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
define(function(require) {
    var $ = require('jquery');
    var App = require('app');

    describe('Marionette application', function() {
        it('should create a Marionette application object', function() {
            assert.isDefined(App);

            assert.typeOf(App, 'object');
        });

        it('should create a `vars` object for storing session data', function() {
            assert.isDefined(App.vars);
        });

        it('should create the main region', function() {
            assert.isDefined(App.mainRegion);

            var $mainRegion = $('#main-region');
            assert.lengthOf($mainRegion, 1);
        });

        it('should create the test region', function() {
            assert.isDefined(App.testRegion);

            var $testRegion = $('#test-region');
            assert.lengthOf($testRegion, 1);
        });
    });
});
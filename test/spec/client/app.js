define([
    'jquery',

    'app'
], function(
    $,
    
    App
) {
    describe('Marionette application', function() {
        it('should create a Marionette application object', function() {
            assert.isDefined(App);

            assert.typeOf(App, 'object');
        });

        it('should create the main content region', function() {
            assert.isDefined(App.mainContentRegion);

            var $mainContent = $('#main-content');
            assert.lengthOf($mainContent, 1);
        });

        it('should create the test region', function() {
            assert.isDefined(App.testRegion);

            var $testRegion = $('#test-region');
            assert.lengthOf($testRegion, 1);
        });
    });
});
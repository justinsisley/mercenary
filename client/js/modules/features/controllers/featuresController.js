define(function(require) {
    var App = require('app');
    var FeaturesView = require('modules/features/views/featuresView');

    return {
        show: function() {
            var featuresView = new FeaturesView();
            
            App.publicLayout.mainRegion.show(featuresView);

            App.vent.trigger('featuresController:show');
            App.vent.trigger('domchange:title', 'Features');
        }
    };
});
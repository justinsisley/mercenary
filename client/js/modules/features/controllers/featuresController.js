define([
    'app',

    'modules/features/views/featuresView'
], function(
    App,

    FeaturesView
) {
    return {
        show: function() {
            var featuresView = new FeaturesView();
            
            App.publicLayout.mainRegion.show(featuresView);

            App.vent.trigger('featuresController:show');
        }
    };
});
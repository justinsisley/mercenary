define([
    'app',
    'modules/home/views/layout',
    'modules/home/views/exampleItemView'
], function(
    App,
    Layout,
    ExampleItemView
) {
    'use strict';

    return {
        show: function() {
            App.vent.trigger('homeController:show');

            var layout = new Layout();
            App.mainContentRegion.show(layout);

            var exampleItemView = new ExampleItemView();

            layout.mainRegion.show(exampleItemView);
        }
    };
});
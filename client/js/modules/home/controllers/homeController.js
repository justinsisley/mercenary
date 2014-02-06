define([
    'app',

    'modules/home/views/homeView'
],function(
    App,

    HomeView
) {
    'use strict';

    return {
        show: function() {
            var homeView = new HomeView();
            
            App.publicLayout.mainRegion.show(homeView);

            App.vent.trigger('homeController:show');
        }
    };
});
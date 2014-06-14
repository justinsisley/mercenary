define(function(require) {
    var App = require('app');
    var HomeView = require('modules/home/views/homeView');

    return {
        show: function() {
            var homeView = new HomeView();
            
            App.publicLayout.mainRegion.show(homeView);

            App.vent.trigger('homeController:show');
            App.vent.trigger('domchange:title');
        }
    };
});
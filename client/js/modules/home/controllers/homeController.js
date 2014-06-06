define([
    'app',
    'modules/home/views/homeView'
],function(
    App,
    HomeView
) {
    return {
        show: function() {
            var homeView = new HomeView();
            
            App.publicLayout.mainRegion.show(homeView);

            App.vent.trigger('homeController:show');
            App.vent.trigger('domchange:title');
        }
    };
});
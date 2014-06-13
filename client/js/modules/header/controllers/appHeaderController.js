define([
    'app',
    'modules/header/views/appHeaderView'
],function(
    App,
    AppHeaderView
) {
    return {
        show: function() {
            var appHeaderView = new AppHeaderView({model: App.vars.user});
            
            App.appLayout.headerRegion.show(appHeaderView);

            App.vent.trigger('appHeaderController:show');
        }
    };
});
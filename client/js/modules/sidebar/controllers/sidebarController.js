define([
    'app',
    'modules/sidebar/views/sidebarView'
],function(
    App,
    SidebarView
) {
    return {
        show: function() {
            var sidebarView = new SidebarView();
            
            App.appLayout.sidebarRegion.show(sidebarView);

            App.vent.trigger('sidebarController:show');
        }
    };
});
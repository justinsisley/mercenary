define([
    'app',
    'modules/dashboard/views/dashboardView'
], function(
    App,
    DasboardView
) {
    return {
        show: function() {
            var dashboardView = new DasboardView();

            App.appLayout.mainRegion.show(dashboardView);

            App.vent.trigger('dashboardController:showDashboard');
        }
    };
});
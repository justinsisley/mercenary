define([
    'app'
], function(
    App
) {
    return {
        showDashboard: function() {
            App.vent.trigger('dashboardController:showDashboard');
        }
    };
});
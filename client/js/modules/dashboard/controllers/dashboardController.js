var App             = require('app');
var DasboardView    = require('modules/dashboard/views/dashboardView');

module.exports = {
    show: function() {
        var dashboardView = new DasboardView();

        App.appLayout.mainRegion.show(dashboardView);

        App.vent.trigger('dashboardController:show');
        App.vent.trigger('domchange:title', 'Dashboard');
    }
};
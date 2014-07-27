var App             = require('app');
var showAppLayout   = require('modules/layout/controllers/appLayoutController');
var DasboardView    = require('modules/dashboard/views/dashboardView');

var controller = {
    dashboard: function() {
        showAppLayout(controller.show);
    },

    show: function() {
        var dashboardView = new DasboardView();

        App.appLayout.mainRegion.show(dashboardView);

        App.vent.trigger('dashboardController:show');
        App.vent.trigger('domchange:title', 'Dashboard');
    }
};

module.exports = controller;
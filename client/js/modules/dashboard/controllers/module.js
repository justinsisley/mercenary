var App             = require('app');
var showAppLayout   = require('shared/layouts/controllers/appLayout');
var DasboardView    = require('modules/dashboard/views/mainItem');
var controller      = {};

controller.dashboard = function() {
    showAppLayout(controller.show);
};

controller.show = function() {
    var dashboardView = new DasboardView();

    App.appLayout.mainRegion.show(dashboardView);

    App.vent.trigger('dashboardController:show');
    App.vent.trigger('domchange:title', 'Dashboard');
};

module.exports = controller;
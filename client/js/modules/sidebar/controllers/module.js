var App         = require('app');
var SidebarView = require('modules/sidebar/views/mainItem');
var controller  = {};

controller.show = function() {
    var sidebarView = new SidebarView();

    App.appLayout.sidebarRegion.show(sidebarView);

    App.vent.trigger('sidebarController:show');
};

module.exports = controller;
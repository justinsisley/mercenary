var App = require('app');
var SidebarView = require('modules/sidebar/views/sidebarView');

module.exports = {
    show: function() {
        var sidebarView = new SidebarView();

        App.appLayout.sidebarRegion.show(sidebarView);

        App.vent.trigger('sidebarController:show');
    }
};
var App = require('app');
var NavbarView = require('modules/navbar/views/navbarView');

module.exports = {
    show: function() {
        var navbarView = new NavbarView();

        App.publicLayout.navbarRegion.show(navbarView);

        App.vent.trigger('navbarController:show');
    }
};
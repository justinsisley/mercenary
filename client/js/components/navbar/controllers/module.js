var App         = require('app');
var NavbarView  = require('components/navbar/views/mainItem');
var controller  = {};

controller.show = function() {
    var navbarView = new NavbarView();

    App.publicLayout.navbarRegion.show(navbarView);

    App.vent.trigger('navbarController:show');
};

module.exports = controller;
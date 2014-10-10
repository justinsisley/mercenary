var App             = require('app');
var AppHeaderView   = require('components/header/views/mainItem');
var controller      = {};

controller.show = function() {
    var appHeaderView = new AppHeaderView({model: App.vars.user});

    App.appLayout.headerRegion.show(appHeaderView);

    App.vent.trigger('appHeaderController:show');
};

module.exports = controller;
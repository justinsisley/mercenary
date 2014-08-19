var App             = require('app');
var showAppLayout   = require('shared/layouts/controllers/appLayout');
var UsersView       = require('modules/users/views/mainItem');
var controller      = {};

controller.users = function() {
    showAppLayout(controller.show);
};

controller.show = function() {
    var usersView = new UsersView();

    App.appLayout.mainRegion.show(usersView);

    App.vent.trigger('usersController:show');
};

module.exports = controller;
var App             = require('app');
var showAppLayout   = require('shared/layouts/controllers/appLayoutController');
var UsersView       = require('modules/users/views/mainItem');

var controller = {
    users: function() {
        showAppLayout(controller.show);
    },

    show: function() {
        var usersView = new UsersView();

        App.appLayout.mainRegion.show(usersView);

        App.vent.trigger('usersController:show');
    }
};

module.exports = controller;
var App = require('app');
var UsersView = require('modules/users/views/usersView');

module.exports = {
    show: function() {
        var usersView = new UsersView();

        App.appLayout.mainRegion.show(usersView);

        App.vent.trigger('usersController:show');
    }
};
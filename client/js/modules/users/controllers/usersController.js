define([
    'app',

    'modules/users/views/usersView'
], function(
    App,

    UsersView
) {
    return {
        show: function() {
            var usersView = new UsersView();

            App.appLayout.mainRegion.show(usersView);

            App.vent.trigger('usersController:show');
        }
    };
});
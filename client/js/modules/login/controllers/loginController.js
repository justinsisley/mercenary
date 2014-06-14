define(function(require) {
    var App = require('app');
    var LoginView = require('modules/login/views/loginView');

    return {
        show: function() {
            var loginView = new LoginView();
            
            App.publicLayout.mainRegion.show(loginView);

            App.vent.trigger('loginController:show');
            App.vent.trigger('domchange:title', 'Log In');
        }
    };
});
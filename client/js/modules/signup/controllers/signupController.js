define(function(require) {
    var App = require('app');
    var SignupView = require('modules/signup/views/signupView');

    return {
        show: function() {
            var signupView = new SignupView();
            
            App.publicLayout.mainRegion.show(signupView);

            App.vent.trigger('signupController:show');
            App.vent.trigger('domchange:title', 'Sign Up');
        }
    };
});
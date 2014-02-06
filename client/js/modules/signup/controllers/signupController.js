define([
    'app',

    'modules/signup/views/signupView'
],function(
    App,

    SignupView
) {
    'use strict';

    return {
        show: function() {
            var signupView = new SignupView();
            
            App.publicLayout.mainRegion.show(signupView);

            App.vent.trigger('signupController:show');
        }
    };
});
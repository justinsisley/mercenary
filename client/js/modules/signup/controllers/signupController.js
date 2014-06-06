define([
    'app',
    'modules/signup/views/signupView'
],function(
    App,
    SignupView
) {
    return {
        show: function() {
            var signupView = new SignupView();
            
            App.publicLayout.mainRegion.show(signupView);

            App.vent.trigger('signupController:show');
            App.vent.trigger('domchange:title', 'Sign Up');
        }
    };
});
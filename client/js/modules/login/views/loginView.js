define([
    'marionette',

    'modules/login/templates/login'
], function(
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'login/login',

        className: 'inner cover',

        events: {
            'submit #js-login-form' : 'formSubmitHandler'
        },

        ui: {
            loginEmail      : '#js-login-email',
            loginPassword   : '#js-login-password'
        },

        formSubmitHandler: function(e) {
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/login',
                data: {
                    email: this.ui.loginEmail.val(),
                    password: this.ui.loginPassword.val()
                }
            }).done(function(response) {
                console.debug(response);

                // Backbone.history.navigate('/dashboard');
            }).fail(function(response) {
                console.debug('failed');
                console.debug(response);
            });
        }
    });
});
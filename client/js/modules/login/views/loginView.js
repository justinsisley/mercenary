define([
    'marionette',

    'app',
    'modules/login/templates/login'
], function(
    Marionette,

    App
) {
    return Marionette.ItemView.extend({
        template: 'login/login',

        className: 'inner cover',

        events: {
            'click #js-login-submit' : 'formSubmitHandler'
        },

        ui: {
            loginEmail      : '#js-login-email',
            loginPassword   : '#js-login-password',
            formMessage     : '#js-form-message'
        },

        formSubmitHandler: function(e) {
            e.preventDefault();

            var self = this,
                email = this.ui.loginEmail.val(),
                password = this.ui.loginPassword.val();

            if (!email) {
                return this.showMessage('You must provide an email address.');
            }

            if (!password) {
                return this.showMessage('You must provide a password.');
            }

            $.ajax({
                type: 'POST',
                url: '/login',
                data: {
                    email: email,
                    password: password
                }
            }).done(function(response) {
                if (response) {
                    if (response.status === 'success') {
                        App.vars.user = response.user;

                        Backbone.history.navigate('/dashboard', true);
                    } else {
                        self.showMessage(response.message);
                    }
                } else {
                    self.showMessage('Something went wrong. Please try again.');
                }
            }).fail(function(response) {
                // You probably don't want to display this.
                self.showMessage('Fail: ' + response);
            });
        },

        showMessage: function(message) {
            this.ui.formMessage.removeClass('hidden');

            this.ui.formMessage.text(message);
        }
    });
});
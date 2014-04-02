define([
    'marionette',
    'validator',

    'app',
    'modules/login/templates/login'
], function(
    Marionette,
    validator,

    App
) {
    return Marionette.ItemView.extend({
        template: 'login/login',

        className: 'inner cover',

        events: {
            'click #js-login-submit' : 'formSubmitHandler'
        },

        ui: {
            loginEmail          : '#js-login-email',
            loginPassword       : '#js-login-password',
            formSuccessMessage  : '#js-form-success-message',
            formErrorMessage    : '#js-form-error-message'
        },

        onRender: function() {
            if (window.location.search.indexOf('active=true') > 0) {
                this.showSuccessMessage('Your account is now active.');
            }
        },

        formSubmitHandler: function(e) {
            e.preventDefault();

            var self = this,
                email = this.ui.loginEmail.val(),
                password = this.ui.loginPassword.val();

            if (!email) {
                return this.showErrorMessage('You must provide an email address.');
            }

            if (!validator.isEmail(email)) {
                return this.showErrorMessage('Please provide a valid email address.');
            }

            if (!password) {
                return this.showErrorMessage('You must provide a password.');
            }

            $.ajax({
                type: 'POST',
                url: '/users/sign-in',
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
                        self.showErrorMessage(response.message);
                    }
                } else {
                    self.showErrorMessage('Something went wrong. Please try again.');
                }
            }).fail(function(response) {
                // You probably don't want to display this.
                self.showErrorMessage('Fail: ' + response);
            });
        },

        showSuccessMessage: function(message) {
            this.ui.formErrorMessage.addClass('hidden');
            this.ui.formSuccessMessage.removeClass('hidden');

            this.ui.formSuccessMessage.text(message);
        },

        showErrorMessage: function(message) {
            this.ui.formSuccessMessage.addClass('hidden');
            this.ui.formErrorMessage.removeClass('hidden');

            this.ui.formErrorMessage.text(message);
        }
    });
});
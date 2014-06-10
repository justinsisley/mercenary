define([
    'marionette',
    'validator',

    'helpers/strings'
], function(
    Marionette,
    validator,

    strings
) {
    return Marionette.ItemView.extend({
        template: 'signup/signup',

        className: 'inner cover',

        ui: {
            signupEmail         : '#js-signup-email',
            signupPassword      : '#js-signup-password',
            signupSubmit        : '#js-signup-submit',
            formSuccessMessage  : '#js-form-success-message',
            formErrorMessage    : '#js-form-error-message'
        },

        events: {
            'click #js-signup-submit' : 'formSubmitHandler'
        },

        formSubmitHandler: function(e) {
            e.preventDefault();

            var email = this.ui.signupEmail.val();
            var password = this.ui.signupPassword.val();

            this.signUpUser(email, password);
        },

        signUpUser: function(email, password) {
            var self = this;

            if (!email) {
                return this.showErrorMessage(strings.noEmail);
            }

            if (!validator.isEmail(email)) {
                return this.showErrorMessage(strings.invalidEmail);
            }

            if (!password) {
                return this.showErrorMessage(strings.invalidPassword);
            }

            $.post('/users/signup', {
                email: email,
                password: password
            }).done(function(response) {
                if (!response || response.status !== 'success') {
                    return self.showErrorMessage(strings.unspecifiedError);
                }

                self.ui.signupEmail.attr('disabled', true);
                self.ui.signupPassword.attr('disabled', true);
                self.ui.signupSubmit.addClass('disabled');

                self.showSuccessMessage(strings.activationSent);
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
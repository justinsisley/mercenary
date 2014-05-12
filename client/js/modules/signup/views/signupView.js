define([
    'marionette',
    'validator',

    'modules/signup/templates/signup'
], function(
    Marionette,
    validator
) {
    return Marionette.ItemView.extend({
        template: 'signup/signup',

        className: 'inner cover',

        events: {
            'click #js-signup-submit' : 'formSubmitHandler'
        },

        ui: {
            signupEmail         : '#js-signup-email',
            signupPassword      : '#js-signup-password',
            signupSubmit        : '#js-signup-submit',
            formSuccessMessage  : '#js-form-success-message',
            formErrorMessage    : '#js-form-error-message'
        },

        formSubmitHandler: function(e) {
            e.preventDefault();

            var self = this,
                email = this.ui.signupEmail.val(),
                password = this.ui.signupPassword.val();

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
                url: '/users/signup',
                data: {
                    email: email,
                    password: password
                }
            }).done(function(response) {
                if (response) {
                    if (response.status === 'success') {
                        self.ui.signupEmail.attr('disabled', true);
                        self.ui.signupPassword.attr('disabled', true);
                        self.ui.signupSubmit.addClass('disabled');

                        self.showSuccessMessage('You have been sent an activation email.');
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
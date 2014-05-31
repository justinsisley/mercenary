define([
    'marionette',
    'validator'
], function(
    Marionette,
    validator
) {
    return Marionette.ItemView.extend({
        template: 'login/login',

        className: 'inner cover',

        ui: {
            loginEmail          : '#js-login-email',
            loginPassword       : '#js-login-password',
            loginSubmitBtn      : '#js-login-submit',
            formSuccessMessage  : '#js-form-success-message',
            formErrorMessage    : '#js-form-error-message'
        },

        events: {
            'click @ui.loginSubmitBtn' : 'formSubmitHandler'
        },

        onRender: function() {
            if (window.location.search.indexOf('active=true') > 0) {
                this.showSuccessMessage('Your account is now active.');
            }

            if (window.location.search.indexOf('active=false') > 0) {
                this.showErrorMessage('Your account is not active.');
            }

            if (window.location.search.indexOf('fail=true') > 0) {
                this.showErrorMessage('Incorrect username/password combination.');
            }
        },

        formSubmitHandler: function(e) {
            var email = this.ui.loginEmail.val();
            var password = this.ui.loginPassword.val();
            var validEmail = (email && validator.isEmail(email));

            if (!validEmail) {
                e.preventDefault();
                return this.showErrorMessage('Please provide a valid email address.');
            }

            if (!password) {
                e.preventDefault();
                return this.showErrorMessage('You must provide a password.');
            }
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
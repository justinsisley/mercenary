define(function(require) {
    var Marionette = require('marionette');
    var validator = require('validator');
    var strings = require('helpers/strings');

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
                this.showSuccessMessage(strings.accountNowActive);
            }

            if (window.location.search.indexOf('active=false') > 0) {
                this.showErrorMessage(strings.accountNowActive);
            }

            if (window.location.search.indexOf('fail=true') > 0) {
                this.showErrorMessage(strings.incorrectLoginCredentials);
            }
        },

        formSubmitHandler: function(e) {
            var email = this.ui.loginEmail.val();
            var password = this.ui.loginPassword.val();
            var validEmail = (email && validator.isEmail(email));

            if (!validEmail) {
                e.preventDefault();
                return this.showErrorMessage(strings.invalidEmail);
            }

            if (!password) {
                e.preventDefault();
                return this.showErrorMessage(strings.invalidPassword);
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
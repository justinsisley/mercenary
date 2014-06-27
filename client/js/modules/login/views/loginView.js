define(function(require) {
    var Marionette  = require('marionette');
    var validator   = require('validator');
    var strings     = require('helpers/strings');

    return Marionette.ItemView.extend({
        template: 'login/login',

        ui: {
            loginEmail              : '#js-login-email',
            loginPassword           : '#js-login-password',
            loginSubmitBtn          : '#js-login-submit',
            emailValidationSuccess  : '#js-email-validation-success',
            emailValidationFailure  : '#js-email-validation-error',
            formSuccessMessage      : '#js-form-success-message',
            formErrorMessage        : '#js-form-error-message'
        },

        events: {
            'click @ui.loginSubmitBtn'  : 'formSubmitHandler',
            'input @ui.loginEmail'      : 'emailKeypressHandler'
        },

        onShow: function() {
            $('body').addClass('login');

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

        onDestroy: function() {
            $('body').removeClass('login');
        },

        formSubmitHandler: function(e) {
            var email       = this.ui.loginEmail.val();
            var password    = this.ui.loginPassword.val();
            var validEmail  = (email && validator.isEmail(email));

            if (!validEmail) {
                e.preventDefault();
                return this.showErrorMessage(strings.invalidEmail);
            }

            if (!password) {
                e.preventDefault();
                return this.showErrorMessage(strings.invalidPassword);
            }
        },

        emailKeypressHandler: function() {
            if (validator.isEmail(this.ui.loginEmail.val())) {
                this.ui.emailValidationSuccess.show();
                this.ui.emailValidationFailure.hide();
            } else {
                this.ui.emailValidationSuccess.hide();
                this.ui.emailValidationFailure.show();
            }
        },

        showSuccessMessage: function(message) {
            this.ui.formSuccessMessage.text(message).show();
            this.ui.formErrorMessage.hide();
        },

        showErrorMessage: function(message) {
            this.ui.formSuccessMessage.hide();
            this.ui.formErrorMessage.text(message).show();
        }
    });
});
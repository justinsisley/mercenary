var Marionette  = require('marionette');
var validator   = require('validator');
var strings     = require('constants/strings');

module.exports = Marionette.ItemView.extend({
    template: 'modules/login/main',

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
            this.showSuccessMessage(strings.ACCOUNT_NOW_ACTIVE);
        }

        if (window.location.search.indexOf('active=false') > 0) {
            this.showErrorMessage(strings.ACCOUNT_NOW_ACTIVE);
        }

        if (window.location.search.indexOf('fail=true') > 0) {
            this.showErrorMessage(strings.INCORRECT_LOGIN_CREDENTIALS);
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
            return this.showErrorMessage(strings.INVALID_EMAIL);
        }

        if (!password) {
            e.preventDefault();
            return this.showErrorMessage(strings.INVALID_PASSWORD);
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
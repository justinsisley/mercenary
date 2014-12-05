var Marionette  = require('marionette');
var validator   = require('validator');
var strings     = require('constants/strings');
var controller  = require('components/auth/activation/controllers/resendItem');

module.exports = Marionette.ItemView.extend({
    template: 'components/auth/activation/mainItem',

    ui: {
        resendForm              : '#js-resend-form',
        userEmail               : '#js-login-email',
        formSubmitBtn           : '#js-login-submit',
        emailValidationSuccess  : '#js-email-validation-success',
        emailValidationFailure  : '#js-email-validation-error',
        formSuccessMessage      : '#js-form-success-message',
        formErrorMessage        : '#js-form-error-message'
    },

    events: {
        'click @ui.formSubmitBtn'   : 'formSubmitHandler',
        'keypress @ui.resendForm'   : 'formKeypressHandler',
        'input @ui.userEmail'       : 'emailKeypressHandler'
    },

    onShow: function() {
        $('body').addClass('login');
    },

    onDestroy: function() {
        $('body').removeClass('login');
    },

    emailKeypressHandler: function() {
        var email = this.ui.userEmail.val();
        var validEmail = validator.isEmail(email);

        if (validEmail) {
            this.ui.emailValidationSuccess.show();
            this.ui.emailValidationFailure.hide();
        } else {
            this.ui.emailValidationSuccess.hide();
            this.ui.emailValidationFailure.show();
        }
    },

    formKeypressHandler: function(e) {
        if (e.which && e.which === 13) {
            return this.formSubmitHandler();
        }
    },

    formSubmitHandler: function() {
        var self        = this;
        var email       = this.ui.userEmail.val();
        var validEmail  = (email && validator.isEmail(email));

        if (!validEmail) {
            return this.showErrorMessage(strings.INVALID_EMAIL);
        }

        controller.resendActivation(email)
        .done(function() {
            self.showSuccessMessage(strings.ACTIVATION_SENT);

            self.ui.userEmail.attr('disabled', true);
            self.ui.formSubmitBtn.addClass('disabled');
        })
        .fail(function(response) {
            var data = response.responseJSON;

            self.showErrorMessage(data.error);
        });
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
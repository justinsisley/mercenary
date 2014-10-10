var _           = require('underscore');
var Marionette  = require('marionette');
var validator   = require('validator');
var controller  = require('components/signup/controllers/mainItem');

module.exports = Marionette.ItemView.extend({
    template: 'components/signup/mainItem',

    ui: {
        signupForm              : '#js-signup-form',
        signupEmail             : '#js-signup-email',
        signupPassword          : '#js-signup-password',
        signupSubmit            : '#js-signup-submit',
        emailValidationSuccess  : '#js-email-validation-success',
        emailValidationFailure  : '#js-email-validation-error',
        formSuccessMessage      : '#js-form-success-message',
        formErrorMessage        : '#js-form-error-message'
    },

    events: {
        'click @ui.signupSubmit'    : 'formSubmitHandler',
        'keypress @ui.signupForm'   : 'formKeypressHandler',
        'input @ui.signupEmail'     : 'emailKeypressHandler'
    },

    onShow: function() {
        $('body').addClass('signup');
    },

    onDestroy: function() {
        $('body').removeClass('signup');
    },

    formKeypressHandler: function(e) {
        if (e.which && e.which === 13) {
            return this.formSubmitHandler(e);
        }
    },

    emailKeypressHandler: function() {
        if (validator.isEmail(this.ui.signupEmail.val())) {
            this.ui.emailValidationSuccess.show();
            this.ui.emailValidationFailure.hide();
        } else {
            this.ui.emailValidationSuccess.hide();
            this.ui.emailValidationFailure.show();
        }
    },

    formSubmitHandler: function(e) {
        e.preventDefault();

        var email = this.ui.signupEmail.val();
        var password = this.ui.signupPassword.val();

        controller.submit(email, password, _.bind(this.signupCallback, this));
    },

    signupCallback: function(err, response) {
        if (err) {return this.showErrorMessage(err);}

        console.log('signupCallback', response);

        this.ui.signupEmail.attr('disabled', true);
        this.ui.signupPassword.attr('disabled', true);
        this.ui.signupSubmit.addClass('disabled');

        this.showSuccessMessage(response);
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
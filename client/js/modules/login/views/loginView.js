define([
    'marionette',
    'validator',

    'modules/login/templates/login'
], function(
    Marionette,
    validator
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

            if (window.location.search.indexOf('fail=true') > 0) {
                this.showErrorMessage('Incorrect username/password combination.');
            }
        },

        formSubmitHandler: function(e) {
            var email = this.ui.loginEmail.val(),
                password = this.ui.loginPassword.val();

            if (!email || !validator.isEmail(email)) {
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
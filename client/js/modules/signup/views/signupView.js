define([
    'marionette',

    'modules/signup/templates/signup'
], function(
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'signup/signup',

        className: 'inner cover',

        events: {
            'submit #js-signup-form' : 'formSubmitHandler'
        },

        ui: {
            signupEmail     : '#js-signup-email',
            signupPassword  : '#js-signup-password'
        },

        formSubmitHandler: function(e) {
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/signup',
                data: {
                    email: this.ui.signupEmail.val(),
                    password: this.ui.signupPassword.val()
                }
            }).done(function(response) {
                console.debug(response);

                $.ajax({
                    url: '/session'
                });
            }).fail(function(response) {
                console.debug('failed');
                console.debug(response);
            });
        }
    });
});
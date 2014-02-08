define([
    'marionette',

    'modules/login/templates/login'
], function(
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'login/login',

        className: 'inner cover'
    });
});
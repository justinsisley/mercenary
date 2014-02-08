define([
    'marionette',

    'modules/signup/templates/signup'
], function(
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'signup/signup',

        className: 'inner cover'
    });
});
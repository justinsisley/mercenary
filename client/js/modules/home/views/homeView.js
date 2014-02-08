define([
    'marionette',

    'modules/home/templates/home'
], function(
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'home/home',

        className: 'inner cover'
    });
});
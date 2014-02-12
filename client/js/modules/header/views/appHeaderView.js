define([
    'app',
    'marionette',

    'modules/header/templates/appHeader'
], function(
    App,
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'header/appHeader'
    });
});
define([
    'marionette',

    'modules/sidebar/templates/sidebar'
], function(
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'sidebar/sidebar'
    });
});
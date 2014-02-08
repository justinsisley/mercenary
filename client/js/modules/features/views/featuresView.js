define([
    'marionette',

    'modules/features/templates/features'
], function(
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'features/features',

        className: 'inner cover'
    });
});
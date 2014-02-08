define([
    'marionette',

    'modules/footer/templates/publicFooter'
], function(
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'footer/publicFooter',

        className: 'mastfoot'
    });
});
define([
    'marionette',

    'modules/footer/templates/publicFooter'
], function(
    Marionette
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'footer/publicFooter',

        className: 'mastfoot'
    });
});
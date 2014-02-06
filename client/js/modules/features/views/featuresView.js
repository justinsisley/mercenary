define([
    'marionette',

    'modules/features/templates/features'
], function(
    Marionette
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'features/features',

        className: 'inner cover'
    });
});
define([
    'marionette',

    'modules/signup/templates/signup'
], function(
    Marionette
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'signup/signup',

        className: 'inner cover'
    });
});
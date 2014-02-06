define([
    'marionette',

    'modules/home/templates/home'
], function(
    Marionette
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'home/home',

        className: 'inner cover'
    });
});
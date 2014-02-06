define([
    'marionette',

    'modules/login/templates/login'
], function(
    Marionette
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'login/login',

        className: 'inner cover'
    });
});
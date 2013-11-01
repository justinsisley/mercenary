define([
    'backbone',
    'marionette'
], function(
    Backbone,
    Marionette
) {
    'use strict';

    return Marionette.ItemView.extend({
        className: 'welcome',

        initialize: function() {},

        onRender: function() {
            this.$el.html('Hello. I\'m your application.');
        }
    });
});
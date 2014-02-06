define([
    'app'
],function(
    App
) {
    'use strict';

    return {
        show: function() {
            App.vent.trigger('appHeaderController:show');
        }
    };
});
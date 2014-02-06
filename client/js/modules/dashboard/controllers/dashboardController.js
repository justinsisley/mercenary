define([
    'app'
], function(
    App
) {
    'use strict';

    return {
        showDashboard: function() {
            App.vent.trigger('dashboardController:showDashboard');
        }
    };
});
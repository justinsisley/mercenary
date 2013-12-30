define([
    'app',
    'modules/home/controllers/homeController'
],function(
    App,
    homeController
) {
    'use strict';

    return {
        home: function() {
            homeController.show();
        }
    };
});
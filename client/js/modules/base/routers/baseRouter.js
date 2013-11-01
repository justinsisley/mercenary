define([
    'backbone',
    'modules/base/controllers/baseController'
], function(Backbone, BaseController) {
    'use strict';

    return Backbone.Marionette.AppRouter.extend({
        controller: BaseController,

        appRoutes: {
            '' : 'home'
        }
    });
});
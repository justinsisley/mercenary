define([
    'backbone',
    'modules/base/templates/appLayout',
    'marionette.dust'
], function(Backbone) {
    return Backbone.Marionette.Layout.extend({
        template: 'base/appLayout',

        regions: {
            headerRegion    : '#header-region',
            sidebarRegion   : '#sidebar-region',
            mainRegion      : '#main-region'
        }
    });
});
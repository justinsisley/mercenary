define([
    'marionette',
    
    'modules/base/templates/appLayout'
], function(Marionette) {
    return Marionette.Layout.extend({
        template: 'base/appLayout',

        regions: {
            headerRegion    : '#header-region',
            sidebarRegion   : '#sidebar-region',
            mainRegion      : '#main-region'
        }
    });
});
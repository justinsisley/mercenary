/**
 * The logged-in, authenticated layout.
 */
define(function(require) {
    var Marionette = require('marionette');
    
    return Marionette.Layout.extend({
        template: 'base/appLayout',

        regions: {
            headerRegion    : '#header-region',
            sidebarRegion   : '#sidebar-region',
            mainRegion      : '#main-region'
        }
    });
});
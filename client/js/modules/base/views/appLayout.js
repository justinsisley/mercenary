/**
 * The logged-in, authenticated layout.
 */
define(function(require) {
    var Marionette = require('marionette');
    
    return Marionette.LayoutView.extend({
        template: 'base/appLayout',

        regions: {
            headerRegion    : '#header-region',
            sidebarRegion   : '#sidebar-region',
            mainRegion      : '#main-region'
        }
    });
});
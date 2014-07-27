/**
 * The logged-in, authenticated layout.
 */
var Marionette = require('marionette');

module.exports = Marionette.LayoutView.extend({
    template: 'layout/appLayout',

    regions: {
        headerRegion    : '#header-region',
        sidebarRegion   : '#sidebar-region',
        mainRegion      : '#main-region'
    }
});
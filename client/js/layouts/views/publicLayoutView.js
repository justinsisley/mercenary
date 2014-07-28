/**
 * The public layout.
 */
var Marionette = require('marionette');

module.exports = Marionette.LayoutView.extend({
    template: 'layouts/publicLayout',

    regions: {
        navbarRegion    : '#navbar-region',
        heroRegion      : '#hero-region',
        signinRegion    : '#signin-region',
        contentRegion   : '#content-region',
        footerRegion    : '#footer-region'
    }
});
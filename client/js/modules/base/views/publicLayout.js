/**
 * The public layout.
 */
define(function(require) {
    var Marionette = require('marionette');
    
    return Marionette.LayoutView.extend({
        template: 'base/publicLayout',

        regions: {
            navbarRegion    : '#navbar-region',
            heroRegion      : '#hero-region',
            signinRegion    : '#signin-region',
            contentRegion   : '#content-region',
            footerRegion    : '#footer-region'
        }
    });
});
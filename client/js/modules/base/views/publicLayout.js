/**
 * The public layout.
 */

define([
    'marionette',
    
    'modules/base/templates/publicLayout'
], function(Marionette) {
    return Marionette.Layout.extend({
        template: 'base/publicLayout',

        className: 'site-wrapper-inner',

        regions: {
            headerRegion    : '#header-region',
            mainRegion      : '#main-region',
            footerRegion    : '#footer-region'
        }
    });
});
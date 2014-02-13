define([
    'marionette',
    'modules/base/templates/publicLayout',
    'marionette.dust'
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
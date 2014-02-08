define([
    'backbone',
    'modules/base/templates/publicLayout',
    'marionette.dust'
], function(Backbone) {
    return Backbone.Marionette.Layout.extend({
        template: 'base/publicLayout',

        className: 'site-wrapper-inner',

        regions: {
            headerRegion    : '#header-region',
            mainRegion      : '#main-region',
            footerRegion    : '#footer-region'
        }
    });
});
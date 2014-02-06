define([
    'backbone',
    'modules/base/templates/publicLayout',
    'marionette.dust'
], function(Backbone) {
    'use strict';

    return Backbone.Marionette.Layout.extend({
        template: 'base/publicLayout',

        className: 'public-layout site-wrapper-inner',

        regions: {
            headerRegion    : '#header-region',
            mainRegion      : '#main-region',
            footerRegion    : '#footer-region'
        }
    });
});
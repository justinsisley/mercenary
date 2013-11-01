define([
    'backbone',
    
    'modules/home/templates/layout',
    
    'marionette.dust'
], function(Backbone) {
    'use strict';

    return Backbone.Marionette.Layout.extend({
        template: 'home/layout',

        className: 'home-layout',

        regions: {
            mainRegion : '#main-region'
        }
    });
});
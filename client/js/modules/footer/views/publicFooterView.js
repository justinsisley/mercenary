var App = require('app');
var Marionette = require('marionette');
var linkHelper = require('../../../helpers/links');

module.exports = Marionette.ItemView.extend({
    template: 'footer/publicFooter',

    ui: {
        navbar: '.navbar-default'
    },

    events: {
        'click a.navbar-brand': linkHelper
    },

    initialize: function() {
        var self = this;

        App.vent.on('publicFooter:fix', function() {
            self.ui.navbar.addClass('navbar-fixed-bottom');
        });

        App.vent.on('publicFooter:unfix', function() {
            self.ui.navbar.removeClass('navbar-fixed-bottom');
        });
    }
});

var App = require('app');
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
    template: 'modules/footer/publicFooter',

    ui: {
        navbar: '.navbar-default'
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

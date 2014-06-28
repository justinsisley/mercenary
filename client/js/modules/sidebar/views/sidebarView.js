var Marionette = require('marionette');
var linkHelper = require('../../../helpers/links');

var App = require('app');

module.exports = Marionette.ItemView.extend({
    template: 'sidebar/sidebar',

    initialize: function() {
        var self = this;

        App.vent.on('dashboardController:show', function() {
            self.selectMenuItem('Dashboard');
        });

        App.vent.on('usersController:show', function() {
            self.selectMenuItem('Users');
        });
    },

    events: {
        'click a': linkHelper
    },

    selectMenuItem: function(item) {
        this.$('.active').removeClass('active');

        this.$('a:contains("' + item + '")').parent().addClass('active');
    }
});

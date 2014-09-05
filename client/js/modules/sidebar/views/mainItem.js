var Marionette = require('marionette');
var App = require('app');

module.exports = Marionette.ItemView.extend({
    template: 'modules/sidebar/mainItem',

    initialize: function() {
        var self = this;

        App.vent.on('dashboardController:show', function() {
            self.selectMenuItem('Dashboard');
        });

        App.vent.on('usersController:show', function() {
            self.selectMenuItem('Users');
        });
    },

    selectMenuItem: function(item) {
        this.$('.active').removeClass('active');

        this.$('a:contains("' + item + '")').parent().addClass('active');
    }
});

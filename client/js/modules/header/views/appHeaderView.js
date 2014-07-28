var Marionette = require('marionette');

require('dropdown');

module.exports = Marionette.ItemView.extend({
    template: 'modules/header/appHeader',

    events: {
        'click #js-logout-link' : 'logoutHandler'
    },

    onShow: function() {
        $('.dropdown-toggle').dropdown();
    },

    logoutHandler: function(e) {
        e.preventDefault();

        Backbone.history.navigate('/logout', true);
    }
});

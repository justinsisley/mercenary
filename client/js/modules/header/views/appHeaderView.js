var Marionette = require('marionette');
var linkHelper = require('../../../helpers/links');

require('dropdown');

module.exports = Marionette.ItemView.extend({
    template: 'header/appHeader',

    events: {
        'click a'               : linkHelper,
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

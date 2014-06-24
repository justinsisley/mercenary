define(function(require) {
    var Marionette = require('marionette');
    
    return Marionette.ItemView.extend({
        template: 'navbar/navbar',

        events: {
            'click a' : 'linkHandler'
        },

        linkHandler: function(e) {
            e.preventDefault();

            Backbone.history.navigate(e.target.pathname, true);
        }
    });
});
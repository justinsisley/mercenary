define(function(require) {
    var Marionette = require('marionette');
    var linkHelper = require('../../../helpers/links');

    return Marionette.ItemView.extend({
        template: 'navbar/navbar',

        events: {
            'click .nav-link' : linkHelper
        }
    });
});

var Marionette = require('marionette');
var linkHelper = require('../../../helpers/links');

module.exports = Marionette.ItemView.extend({
    template: 'navbar/navbar',

    events: {
        'click .nav-link' : linkHelper
    }
});

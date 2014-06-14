define(function(require) {
    var Marionette = require('marionette');

    return Marionette.ItemView.extend({
        template: 'features/features',

        className: 'inner cover'
    });
});
define(function(require) {
    var Marionette = require('marionette');

    return Marionette.ItemView.extend({
        template: 'home/home',

        className: 'inner cover'
    });
});
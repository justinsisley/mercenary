define(function(require) {
    var Marionette = require('marionette');

    return Marionette.ItemView.extend({
        template: 'users/users',

        className: 'users'
    });
});
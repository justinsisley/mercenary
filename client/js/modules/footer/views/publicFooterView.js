define(function(require) {
    var Marionette = require('marionette');
    
    return Marionette.ItemView.extend({
        template: 'footer/publicFooter',

        className: 'mastfoot'
    });
});
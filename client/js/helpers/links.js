define(function(require) {
    var Backbone = require('backbone');

    return function(e) {
        e.preventDefault();

        Backbone.history.navigate(e.target.pathname, true);
    };
});

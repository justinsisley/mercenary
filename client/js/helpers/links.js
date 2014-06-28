var Backbone = require('backbone');

module.exports = function(e) {
    e.preventDefault();

    Backbone.history.navigate(e.target.pathname, true);
};

// By default, all links will be handled
// by the Backbone routers. You can force
// an external link by adding a "target"
// attribute with a value of "_blank"
// or "_self".

var $ = require('jquery');
var Backbone = require('backbone');

function linkHandler(e) {
    var link            = e.currentTarget;
    var target          = link.target;
    var path            = link.pathname;
    var isExternalLink  = (target === '_blank' || target === '_self');

    if (!isExternalLink) {
        e.preventDefault();

        Backbone.history.navigate(path, true);
    }
}

$('body').on('click', 'a', linkHandler);

module.exports = linkHandler;
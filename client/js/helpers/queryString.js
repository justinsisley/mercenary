module.exports = function() {
    var location    = window.location;
    var url         = location.href;
    var pathname    = location.pathname;
    var origin      = location.origin;
    var queryObject = {};

    url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), function($0, $1, $2, $3) {
        if ($1 !== origin + pathname) {
            if ($1 === origin + pathname + '#state') {
                queryObject.state = $3;
            } else if ($1 === origin + pathname + '#error') {
                queryObject.error = $3;
            } else {
                queryObject[$1] = $3;
            }
        }
    });

    return queryObject;
};
module.exports = function() {
    var url = window.location.href;
    var queryObject = {};

    url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), function($0, $1, $2, $3) {
        if ($1 !== window.location.origin + window.location.pathname) {
            if ($1 === window.location.origin + window.location.pathname + '#state') {
                queryObject.state = $3;
            } else if ($1 === window.location.origin + window.location.pathname + '#error') {
                queryObject.error = $3;
            } else {
                queryObject[$1] = $3;
            }
        }
    });

    return queryObject;
};
// URI helper
module.exports = function(url) {
    var parser = document.createElement('a');
    var searchObject = {};
    var queries;
    var split;
    var value;
    
    // Let the browser do the work
    parser.href = url || window.location.href;
    
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    
    for (var i = 0; i < queries.length; i++) {
        split = queries[i].split('=');

        value = split[1];

        // Convert string representations
        // of numbers and booleans to their
        // proper types.
        // TODO: parse objects and arrays
        if (value === 'true') {
            value = true;
        } else if (value === 'false') {
            value = false;
        } else if (!isNaN(+value)) {
            value = +value;
        }

        searchObject[split[0]] = value;
    }

    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
};
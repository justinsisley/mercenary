var request = require('superagent');
var config  = require('../../config');
var strings = require('../constants/strings');
var apiUrl  = process.env.API_BASE_URL || config.settings.apiBaseUrl;

module.exports = function(req, res) {
    var method      = req.method;
    var path        = req.originalUrl;
    var fullPath    = apiUrl + path;
    var body        = req.body || {};

    // Handler for API responses
    function respond(err, response) {
        if (!response) {return res.json({error: strings.NO_PROXY_SERVER_RESPONSE});}

        var statusCode = response.statusCode;
        var errorCodes = [400, 401, 403, 500];
        var error = (errorCodes.indexOf(statusCode) > -1);

        if (error) {
            // Return helpful information for
            // debugging API issues.
            return res.status(statusCode).json({
                error   : response.error,
                body    : response.body,
                text    : response.text
            });
        }

        return res.json(response.body);
    }

    // POSTs and PUTs tend to have bodies
    if (method === 'POST' || method === 'PUT') {
        return request[method.toLowerCase()](fullPath)
            .send(body)
            .set('X-Mercenary-App-ID', config.secrets.appId)
            .end(respond);
    }

    // GETs and DELETEs are body-less
    if (method === 'GET') {method = 'get';}
    if (method === 'DELETE') {method = 'del';}

    return request[method](fullPath)
        .set('X-Mercenary-App-ID', config.secrets.appId)
        .end(respond);
};
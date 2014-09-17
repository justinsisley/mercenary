var config = require('../../config');

var prdEnvironment = (
    'production' === process.env.NODE_ENV ||
    'production' === config.settings.env
);

var devEnvironment = (
    'development' === process.env.NODE_ENV ||
    'development' === config.settings.env &&
    !prdEnvironment
);

var port            = (process.env.PORT || config.settings.port);
var devDomain       = config.settings.protocol + '://127.0.0.1';
var prdDomain       = config.settings.protocol + '://' + config.settings.domain;
var devServerURL    = devDomain + ':' + port;
var prdServerURL    = prdDomain;
var serverURL;
var domain;

if (prdEnvironment) {
    serverURL = prdServerURL;

    domain = prdDomain;
} else {
    serverURL = devServerURL;

    domain = devDomain;
}

module.exports = {
    IS_PRD: prdEnvironment,
    IS_DEV: devEnvironment,

    PORT: port,
    DOMAIN: domain,
    SERVER_URL: serverURL
};
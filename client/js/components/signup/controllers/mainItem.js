var validator   = require('validator');
var settings    = require('../../../constants/settings');
var strings     = require('../../../constants/strings');
var controller  = {};

controller.submit = function(email, password, callback) {
    if (!email) {
        return callback(strings.NO_EMAIL);
    }

    if (!validator.isEmail(email)) {
        return callback(strings.INVALID_EMAIL);
    }

    if (!password) {
        return callback(strings.INVALID_PASSWORD);
    }

    if (password.length < settings.MINIMUM_PASSWORD_LENGTH) {
        return callback(strings.SHORT_PASSWORD);
    }

    $.post('/users/signup', {
        email: email,
        password: password
    }).done(function(response) {
        if (!response || response.status !== 'success') {
            return callback(response.message || strings.UNSPECIFIED_ERROR);
        }

        return callback(null, strings.ACTIVATION_SENT);
    }).fail(function(response) {
        var message = response && response.message;

        return callback(message || strings.UNSPECIFIED_ERROR);
    });
};

module.exports = controller;
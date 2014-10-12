var $ = require('jquery');
var controller = {};

controller.resendActivation = function(email) {
    return $.post('/users/activation/resend', {
        email: email
    });
};

module.exports = controller;
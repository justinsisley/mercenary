var async = require('async');
var strings = require('../../constants/strings');

var controller = {
    updatePassword: function(req, res) {
        var passwordProvided = req.body.currentPassword;
        var newPassword = req.body.newPassword;

        if (!passwordProvided) {
            return res.json({
                status: 'fail',
                message: strings.CURRENT_PASSWORD_REQUIRED
            });
        }

        if (!newPassword) {
            return res.json({
                status: 'fail',
                message: strings.NEW_PASSWORD_REQUIRED
            });
        }

        function confirmCurrentPassword(callback) {
            req.user.comparePassword(passwordProvided, callback);
        }

        function saveUpdatedPassword(passwordConfirmed, callback) {
            if (!passwordConfirmed) {
                return res.json({
                    status: 'fail',
                    message: strings.CURRENT_PASSWORD_INCORRECT
                });
            }

            req.user.password = newPassword;

            req.user.save(callback);
        }

        function respond(err) {
            if (err) {
                return res.json({
                    status: 'error',
                    message: strings.PASSWORD_CHANGE_FAILED
                });
            }

            return res.json({status: 'success'});
        }

        async.waterfall([
            confirmCurrentPassword,
            saveUpdatedPassword
        ], respond);
    },

    recoverPassword: function() {},
    resetPassword: function() {}
};

module.exports = controller;
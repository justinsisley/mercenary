var async = require('async');

var controller = {
    updatePassword: function(req, res) {
        var passwordProvided = req.body.currentPassword;
        var newPassword = req.body.newPassword;

        if (!passwordProvided) {
            return res.json({
                status: 'fail',
                message: 'You must provide your current password.'
            });
        }

        if (!newPassword) {
            return res.json({
                status: 'fail',
                message: 'You must provide a new password.'
            });
        }

        function confirmCurrentPassword(callback) {
            req.user.comparePassword(passwordProvided, callback);
        }

        function saveUpdatedPassword(passwordConfirmed, callback) {
            if (!passwordConfirmed) {
                return res.json({
                    status: 'fail',
                    message: 'Your current password is incorrect.'
                });
            }

            req.user.password = newPassword;

            req.user.save(callback);
        }

        function respond(err) {
            if (err) {
                return res.json({
                    status: 'error',
                    message: 'We were unable to update your password. We\'re looking into the problem.'
                });
            }

            return res.json({
                status: 'success'
            });
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
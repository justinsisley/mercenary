var controller = {
    updatePassword: function(req, res) {
        var currentPassword = req.body.currentPassword,
            newPassword = req.body.newPassword;

        if (!currentPassword) {
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

        req.user.comparePassword(currentPassword, function(err, isMatch) {
            if (!isMatch) {
                return res.json({
                    status: 'fail',
                    message: 'Your current password is incorrect.'
                });
            }

            req.user.password = newPassword;

            req.user.save(function(err) {
                if (err) {
                    return res.json({
                        status: 'error',
                        message: 'We were unable to update your password. We\'re looking into the problem.'
                    });
                }

                return res.json({
                    status: 'success'
                });
            });
        });
    },

    recoverPassword: function() {},
    resetPassword: function() {}
};

module.exports = controller;
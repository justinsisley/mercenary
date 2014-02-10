module.exports = function(req, res) {
    'use strict';

    var localUserController = require('./localUserController');

    if (req.isAuthenticated()) {
        return res.json({
            status: 'success',
            data: {
                user: localUserController.sanitizeUserData(req.user)
            }
        });
    } else {
        return res.json({
            status: 'fail',
            data: {}
        });
    }
};
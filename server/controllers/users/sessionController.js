module.exports = function(req, res) {
    'use strict';

    if (req.isAuthenticated()) {
        return res.json({
            status: 'success'
        });
    } else {
        return res.json({
            status: 'fail'
        });
    }
};
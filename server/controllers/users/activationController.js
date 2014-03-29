var User = require('../../models/User');

module.exports = {
    activateUser: function(req, res) {
        if (!req.route || !req.route.params || !req.route.params[0]) {
            res.redirect('/');
        }

        var activationKey = req.route.params[0];

        User.activate(activationKey, function(err) {
            if (err) {
                return res.redirect('/');
            }

            return res.redirect('/login?active=1');
        });
    }
};
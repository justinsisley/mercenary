var User = require('../../models/User');

module.exports = {
    activateUser: function(req, res) {
        if (!req.params || !req.params[0]) {
            res.redirect('/');
        }

        var activationKey = req.params[0];

        User.activate(activationKey, function(err) {
            if (err) {
                return res.redirect('/');
            }

            return res.redirect('/login?active=true');
        });
    }
};
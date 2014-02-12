var User = require('../../models/User');

module.exports = function(req, res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save(function(err, newUser) {
        if (err) {
            return res.json({
                status: 'fail'
            });
        }

        return res.json(newUser);
    });
};
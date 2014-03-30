var User = require('../../models/User');

module.exports = {
    createUser: function(req, res) {
        User.findOne({email: req.body.email}, function(err, user) {
            if (user) {
                return res.json({
                    status: 'fail',
                    message: 'That account already exists.'
                });
            }

            user = new User({
                email: req.body.email,
                password: req.body.password
            });

            user.save(function(err, newUser) {
                if (err) {
                    console.log(err);
                }

                console.log(newUser);

                return res.json({status: 'success'});
            });
        });
    },

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
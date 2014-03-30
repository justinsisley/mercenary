var User = require('../../models/User');

module.exports = function(req, res) {
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
};
var User = require('../../models/User');

module.exports = function(req, res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save(function(err, newUser) {
        if (err) {
            console.log(err);

            return res.json({
                status: 'fail',
                message: 'That account already exists.'
            });
        }

        console.log(newUser);

        return res.json({status: 'success'});
    });
};
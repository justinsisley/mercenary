var User = require('../../models/User');
var async = require('async');

module.exports = {
    createUser: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        function findUserByEmail(callback) {
            User.findOne({email: email}, callback);
        }

        function saveNewUser(user, callback) {
            if (user) {
                return res.json({
                    status: 'fail',
                    message: 'That account already exists.'
                });
            }

            user = new User({
                email: email,
                password: password
            });

            user.save(callback);
        }

        function respond(err, user) {
            if (err) {
                console.log(err);
                
                return res.json({
                    status: 'error'
                });
            }

            return res.json({
                status: 'success',
                user: {
                    email   : user.email,
                    profile : user.profile,
                    active  : user.active
                }
            });
        }

        async.waterfall([
            findUserByEmail,
            saveNewUser
        ], respond);
    },

    activateUser: function(req, res) {
        if (!req.params.key) {
            return res.redirect('/');
        }

        var activationKey = req.params.key;

        User.activate(activationKey, function(err) {
            if (err) {
                return res.redirect('/login');
            }

            return res.redirect('/login?active=true');
        });
    }
};
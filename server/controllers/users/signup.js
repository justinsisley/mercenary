var async   = require('async');
var User    = require('../../models/User');
var strings = require('../../constants/strings');

module.exports = {
    createUser: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        if (!email || !password) {
            return res.json({
                status: 'fail',
                message: strings.INVALID_EMAIL_OR_PASSWORD
            });
        }

        function findUserByEmail(callback) {
            User.findOne({email: email}, callback);
        }

        function saveNewUser(user, callback) {
            if (user) {
                return res.json({
                    status: 'fail',
                    message: strings.ACCOUNT_ALREADY_EXISTS
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
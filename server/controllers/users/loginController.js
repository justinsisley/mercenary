var passport = require('passport');

module.exports = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            console.log(info);

            return res.json({
                status: 'fail',
                message: 'Incorrect username/password combination.'
            });
        }

        if (user.active === false) {
            return res.json({
                status: 'fail',
                message: 'Account not activated. Check your email.'
            });
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            return res.json({
                status: 'success',
                user: user
            });
        });
    })(req, res, next);
};
var passport = require('passport');

module.exports = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            console.log(info);

            return res.redirect('/login?fail=true');
        }

        if (user.active === false) {
            return res.redirect('/login?active=false');
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });
    })(req, res, next);
};
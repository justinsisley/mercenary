module.exports = function(req, res) {
    var user = {
        email: req.user.email,
        profile: req.user.profile
    };

    return res.json({
        status: 'success',
        user: user
    });
};
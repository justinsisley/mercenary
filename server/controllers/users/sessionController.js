module.exports = function(req, res) {
    return res.json({
        status: 'success',
        user: req.user.profile
    });
};
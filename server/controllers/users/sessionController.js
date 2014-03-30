module.exports = function(req, res) {
    // User is available in req.user
    // You should probably only return
    // specific pieces of their data,
    // such as their profile information.
    return res.json({
        status: 'success',
        user: true
    });
};
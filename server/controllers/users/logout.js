module.exports = function(req, res) {
    req.logout();

    return res.json({status: 'success'});
};
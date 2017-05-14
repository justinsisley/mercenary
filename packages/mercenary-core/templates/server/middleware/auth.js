const roles = require('../constants/roles');

module.exports = {
  requireAdmin(req, res, next) {
    const isAdmin = req.jwt.role === roles.ADMIN;

    if (!isAdmin) {
      return res.status(403).json({});
    }

    return next();
  },
};

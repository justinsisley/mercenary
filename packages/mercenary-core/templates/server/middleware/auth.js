const jwt = require('tokenpress').fwt;
const roles = require('../constants/roles');

module.exports = {
  requireAuth(req, res, next) {
    const failed = () => res.status(401).json({});

    const token = req.headers.authorization;

    if (!token) {
      return failed();
    }

    return jwt.verify(token).then((user) => {
      req.user = user;

      next();
    })
    .catch(failed);
  },

  requireAdmin(req, res, next) {
    const isAdmin = req.user.role === roles.ADMIN;

    if (!isAdmin) {
      return res.status(403).json({});
    }

    return next();
  },
};

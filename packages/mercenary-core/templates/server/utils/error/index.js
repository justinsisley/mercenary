module.exports = {
  respondWithErrorCode(errorCode, res, error, message) {
    const payload = {};

    if (error) {
      payload.error = error;
    }

    if (message) {
      payload.message = message;
    }

    res.status(errorCode).json(payload);
  },

  // Bad request
  respond400(res, error, message) {
    this.respondWithErrorCode(400, res, error, message);
  },

  // Unauthorized
  respond401(res, error, message) {
    this.respondWithErrorCode(401, res, error, message);
  },

  // Server error
  respond500(res, error, message) {
    this.respondWithErrorCode(500, res, error, message);
  },
};

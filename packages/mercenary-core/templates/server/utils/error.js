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

  respond400(res, error, message) {
    this.respondWithErrorCode(400, res, error, message);
  },

  respond500(res, error, message) {
    this.respondWithErrorCode(500, res, error, message);
  },
};

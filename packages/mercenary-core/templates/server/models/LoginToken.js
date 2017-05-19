const uuid = require('uuid/v1');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: String,
  token: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    expires: 60 * 60 * 1, // expires after 1 hour
    default: Date.now,
  },
}, {
  timestamps: true,
});

schema.path('token').default(() => {
  const rawToken = new Buffer(uuid());
  const base64Token = rawToken.toString('base64');
  const urlSafeToken = base64Token.replace(/=/g, '');

  return urlSafeToken;
});

schema.statics.findByToken = function findByToken(token) {
  return new Promise((resolve, reject) => {
    this.findOne({
      token,
    }, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(data);
    });
  });
};

// HACK: Prevents problems with re-creating schemas when "hot-reloading"
let model;
try {
  model = mongoose.model('LoginToken');
} catch (error) {
  model = mongoose.model('LoginToken', schema);
}

module.exports = model;

const uuid = require('node-uuid');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: String,
  token: String,
}, {
  timestamps: true,
});

schema.path('token').default(() => {
  const rawToken = `${uuid.v1()}:${Date.now()}`;

  const encodedToken = (new Buffer(rawToken)).toString('base64');
  const token = encodedToken.replace(/=/g, '');

  return token;
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
  model = mongoose.model('SignupToken');
} catch (error) {
  model = mongoose.model('SignupToken', schema);
}

module.exports = model;

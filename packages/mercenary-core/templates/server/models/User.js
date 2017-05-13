const uuid = require('uuid/v1');
const loglevel = require('loglevel');
const mongoose = require('mongoose');
const tokenpress = require('tokenpress');
const roles = require('../constants/roles');

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: String,
  role: {
    type: String,
    default: roles.USER,
  },
  verified: {
    type: Boolean,
    defult: false,
  },
  signupToken: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

schema.path('signupToken').default(() => {
  const rawToken = `${uuid.v1()}:${Date.now()}`;

  const encodedToken = (new Buffer(rawToken)).toString('base64');
  const token = encodedToken.replace(/=/g, '');

  return token;
});

// Hide sensitive data for API responses
schema.methods.toPublicObject = function toPublicObject() {
  const publicObject = Object.assign({}, this.toObject());

  delete publicObject.__v;
  delete publicObject._id;
  delete publicObject.signupToken;

  return publicObject;
};

// Session objects should contain only essential data
schema.methods.toSessionObject = function toSessionObject() {
  const { email, role } = this.toObject();

  return { email, role };
};

schema.methods.getSessionToken = function getSessionToken() {
  return new Promise((resolve, reject) => {
    tokenpress.jwt.sign(this.toSessionObject())
    .then((token) => {
      resolve(token);
    })
    .catch((error) => {
      loglevel.error(error);
      reject(error);
    });
  });
};

schema.statics.findByEmail = function findByEmail(email) {
  return new Promise((resolve, reject) => {
    this.findOne({ email }, (error, data) => {
      if (error) {
        loglevel.error(error);
        reject(error);
        return;
      }

      resolve(data);
    });
  });
};

schema.statics.findBySignupToken = function findBySignupToken(signupToken) {
  return new Promise((resolve, reject) => {
    this.findOne({ signupToken }, (error, data) => {
      if (error) {
        loglevel.error(error);
        reject(error);
        return;
      }

      resolve(data);
    });
  });
};

schema.statics.findOrCreate = function findOrCreate(query) {
  return new Promise((resolve, reject) => {
    this.findOne(query, (findOneError, existingData) => {
      if (findOneError) {
        loglevel.error(findOneError);
        reject(findOneError);
        return;
      }

      if (existingData) {
        resolve(existingData);
        return;
      }

      this.create(query, (createError, newData) => {
        if (createError) {
          loglevel.error(createError);
          reject(createError);
          return;
        }

        resolve(newData);
      });
    });
  });
};

// HACK: Prevents problems with re-creating schemas when "hot-reloading"
let model;
try {
  model = mongoose.model('User');
} catch (error) {
  model = mongoose.model('User', schema);
}

module.exports = model;

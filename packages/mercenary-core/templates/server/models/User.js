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
  role: String,
}, {
  timestamps: true,
});

schema.pre('save', function preSave(next) {
  if (!this.role) {
    this.role = roles.USER;
  }

  next();
});

// Hide sensitive data for API responses
schema.methods.toPublicObject = function toPublicObject() {
  const publicObject = Object.assign({}, this.toObject());

  delete publicObject.__v;
  delete publicObject._id;

  return publicObject;
};

schema.methods.getAuthToken = function getAuthToken() {
  return new Promise((resolve, reject) => {
    tokenpress.jwt.sign(this.toObject())
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
    this.findOne({
      email,
    }, (error, data) => {
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

module.exports = mongoose.model('User', schema);

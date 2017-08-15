const mongoose = require('mongoose');
const tokenpress = require('tokenpress');

const schema = new mongoose.Schema({
  email: String,
  token: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    expires: '5m',
    default: Date.now,
  },
}, {
  timestamps: true,
});

// This is a credential, and should be encrypted at rest
schema.pre('save', async function preSave(next) {
  this.token = await tokenpress.node.utils.getURLSafeToken();
  next();
});

// HACK: Prevents problems with re-creating schemas when "hot-reloading"
let model;
try {
  model = mongoose.model('LoginToken');
} catch (error) {
  model = mongoose.model('LoginToken', schema);
}

module.exports = model;

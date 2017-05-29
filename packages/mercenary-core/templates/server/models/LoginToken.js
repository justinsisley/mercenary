const mongoose = require('mongoose');
const tokenpress = require('tokenpress');

const { getURLSafeToken } = tokenpress.node.string;

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

schema.path('token').default(getURLSafeToken);

schema.statics.findByToken = function findByToken(token) {
  return this.findOne({ token });
};

// HACK: Prevents problems with re-creating schemas when "hot-reloading"
let model;
try {
  model = mongoose.model('LoginToken');
} catch (error) {
  model = mongoose.model('LoginToken', schema);
}

module.exports = model;

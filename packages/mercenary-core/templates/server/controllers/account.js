const router = require('express').Router;
const User = require('../models/User');
const mailUtil = require('../utils/mail');
const errorUtil = require('../utils/error');

// Create a new router
const accountRouter = router();

// Handle POST /api/account/create
accountRouter.post('/account/create', (req, res) => {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('name', 'Invalid name').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({
        type: 'validationError',
        errors: result.array(),
      });

      return;
    }

    const { email, name } = req.body;
    const user = new User({ email, name });

    user.save();

    mailUtil.sendSignup(email, user.signupToken)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      errorUtil.respond500(res, error, 'Unable to send signup email');
    });
  });
});

// Handle POST /api/account/verify
accountRouter.post('/account/verify', (req, res) => {
  req.checkBody('token', 'Invalid token').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({
        type: 'validationError',
        errors: result.array(),
      });

      return;
    }

    const { token } = req.body;

    User.findBySignupToken(token)
    .then((user) => {
      user.verified = true; // eslint-disable-line
      user.signupToken = null; // eslint-disable-line

      // Fire and forget
      user.save();

      res.json({ token: user.getSessionToken() });
    })
    .catch((error) => {
      errorUtil.respond400(res, error, 'Unable to verify account');
    });
  });
});

module.exports = accountRouter;

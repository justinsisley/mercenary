// Don't create a SignupToken entity, just have a property on the User
// Also have a "verified" property on the user
// If the user doesn't verify the account within a certain amount of time, delete the account
debugger; // Read above

const router = require('express').Router;
const User = require('../models/User');
const SignupToken = require('../models/SignupToken');
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
    const accountToken = new SignupToken({ email });

    accountToken.save();

    mailUtil.sendSignup(email, accountToken.token)
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
    SignupToken.findByToken(token)
    .then((email) => {

    });

    accountToken.save();

    user.save()
    .then(() => {
      mailUtil.sendSignup(email, accountToken.token)
      .then(() => {
        res.json({});
      })
      .catch((error) => {
        errorUtil.respond500(res, error, 'Unable to send signup email');
      });
    })
    .catch((error) => {
      errorUtil.respond500(res, error, 'Unable to generate signup token');
    });
  });
});

module.exports = accountRouter;

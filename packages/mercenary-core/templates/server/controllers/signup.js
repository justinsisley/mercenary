const router = require('express').Router;
const User = require('../models/User');
const mailUtil = require('../utils/mail');
const errorUtil = require('../utils/error');

// Create a new router
const signupRouter = router();

// Handle POST /api/signup/login
signupRouter.post('/signup', (req, res) => {
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
    const signupToken = new SignupToken({ email });

    user.save()
    .then(() => {
      mailUtil.sendLogin(email, signupToken.token)
      .then(() => {
        res.json({});
      })
      .catch((error) => {
        errorUtil.respond500(res, error, 'Unable to send login email');
      });
    })
    .catch((error) => {
      errorUtil.respond500(res, error, 'Unable to generate login token');
    });
  });
});

module.exports = signupRouter;

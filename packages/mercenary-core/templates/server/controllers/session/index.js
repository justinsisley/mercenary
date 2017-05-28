const router = require('express').Router;
const tokenpress = require('tokenpress');
const LoginToken = require('../../models/LoginToken');
const mailUtil = require('../../utils/mail');
const errorUtil = require('../../utils/error');

const { requireAuth } = tokenpress.node.middleware;

// Create a new router
const sessionRouter = router();

// Handle POST /api/session
// Request an email containing a loginToken
sessionRouter.post('/session', (req, res) => {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errorUtil.respond400(res, result.array(), 'Invalid email');
      return;
    }

    const email = req.body.email;
    const loginToken = new LoginToken({ email });

    loginToken.save()
    .then(() => {
      mailUtil.sendLogin(email, loginToken.token)
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

// Handle POST /api/session/token
// Exchange the loginToken from a login email for an session token
sessionRouter.post('/session/token', (req, res) => {
  const token = req.body.token;

  if (!token) {
    errorUtil.respond400(res, {}, 'Missing login token');
    return;
  }

  LoginToken.findByToken(req.body.token)
  .then((data) => {
    if (!data) {
      errorUtil.respond400(res, null, 'Unable to find token');
      return;
    }

    // Remove the token from the DB after it's been used
    data.remove();

    const email = data.email;

    // Create a JWT using the email as the payload
    tokenpress.node.jwt.sign({ email })
    .then((jwt) => {
      res.json({
        token: jwt,
      });
    })
    .catch((error) => {
      errorUtil.respond500(res, error, 'Unable to generate session token');
    });
  });
});

// Handle GET /api/session/verify
// Example router that verifies a JWT from the client
// NOTE: For example only
sessionRouter.get('/session/verify', requireAuth, (req, res) => {
  if (!req.jwt) {
    errorUtil.respond401(res, {}, 'Missing credentials');
    return;
  }

  res.json({
    jwt: req.jwt,
  });
});

module.exports = sessionRouter;

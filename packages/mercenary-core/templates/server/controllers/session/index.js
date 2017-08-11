const tokenpress = require('tokenpress');
const LoginToken = require('../../models/LoginToken');
const mailUtil = require('../../utils/mail');
const errorUtil = require('../../utils/error');

// Request an email containing a loginToken
async function loginTokenRequestHandler(req, res) {
  try {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();

    const validationResult = await req.getValidationResult();
    const hasValidationError = !validationResult.isEmpty();

    if (hasValidationError) {
      errorUtil.respond400(res, validationResult.array(), 'Invalid email');
      return;
    }

    const email = req.body.email;
    const loginToken = new LoginToken({ email });

    await loginToken.save();
    await mailUtil.sendLogin(email, loginToken.token);

    res.json({});
  } catch (error) {
    errorUtil.respond500(res, error, 'Unable to generate login token');
  }
}

// Exchange the loginToken from a login email for an session token
async function sessionTokenRequestHandler(req, res) {
  try {
    req.checkBody('token', 'Invalid token').notEmpty();

    const validationResult = await req.getValidationResult();
    const hasValidationError = !validationResult.isEmpty();

    if (hasValidationError) {
      errorUtil.respond400(res, validationResult.array(), 'Invalid token');
      return;
    }

    const token = req.body.token;

    if (!token) {
      errorUtil.respond400(res, {}, 'Missing login token');
      return;
    }

    const loginToken = await LoginToken.findOne({ token });

    if (!loginToken) {
      errorUtil.respond400(res, null, 'Unable to find token');
      return;
    }

    // Remove the token from the DB after it's been used
    loginToken.remove();

    // Create a JWT using the email as the payload
    const jwt = await tokenpress.node.jwt.sign({
      email: loginToken.email,
    });

    res.json({
      token: jwt,
    });
  } catch (error) {
    errorUtil.respond500(res, error, 'Unable to generate session token');
  }
}

// Example handler that verifies a JWT from the client.
// If the JWT is not valid, this request will fail with a 401 response code
// NOTE: This is here as an example only, and should be removed.
function verifySessionTokenHandler(req, res) {
  res.json({
    jwt: req.jwt,
  });
}

module.exports = {
  loginTokenRequestHandler,
  sessionTokenRequestHandler,
  verifySessionTokenHandler,
};

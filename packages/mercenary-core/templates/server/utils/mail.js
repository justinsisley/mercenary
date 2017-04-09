const path = require('path');
const mjmlUtils = require('mjml-utils');
const config = require('../config');

const emailTemplateDir = path.join(__dirname, '../../../email/dist/');

// Send the login email to the provided email address
function sendLogin(to, loginToken) {
  const loginURL = `${config.domain}/login/${loginToken}`;

  return mjmlUtils.sendmail({
    to,
    subject: 'MonthEnd Apps Login',
    text: `Go to ${loginURL} to log in.`,
    template: path.join(emailTemplateDir, 'login.html'),
    data: { loginURL },
  });
}

module.exports = {
  sendLogin,
};

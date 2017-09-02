const path = require('path');
const loglevel = require('loglevel');
const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const mjmlUtils = require('mjml-utils');
const config = require('../../config');

const emailTemplateDir = path.join(__dirname, '../../../email/');

// Configure mail sending
mjmlUtils.sendmail.config({
  fromAddress: config.email.fromAddress,
  transport: nodemailer.createTransport(sesTransport({
    accessKeyId: config.email.ses.accessKeyId,
    secretAccessKey: config.email.ses.secretAccessKey,
    region: config.email.ses.region,
  })),
});

// Send the login email to the specified email address
function sendLogin(to, loginToken) {
  const loginURL = `${config.domain}/login/${loginToken}`;

  return mjmlUtils.sendmail({
    to,
    subject: 'App Login',
    text: `Go to ${loginURL} to log in.`,
    template: path.join(emailTemplateDir, 'login.mjml'),
    data: { loginURL },
    onError: (error) => {
      loglevel.error(error);
    },
  });
}

module.exports = {
  sendLogin,
};

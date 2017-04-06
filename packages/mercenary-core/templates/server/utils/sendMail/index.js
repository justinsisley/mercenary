const path = require('path');
const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const mjmlUtils = require('mjml-utils');
const config = require('../../../config');

const deployConfig = config.get('deploy');
const accessKeyId = deployConfig.aws.iam.accessKeyId;
const secretAccessKey = deployConfig.aws.iam.secretAccessKey;
const region = 'us-east-1';
const domain = config.get('app').domain;
const fromAddress = config.get('email').fromAddress;

const emailTemplateDir = path.join(__dirname, '../../../email/dist/');

mjmlUtils.sendmail.config({
  fromAddress,
  transporter: nodemailer.createTransport(sesTransport({
    accessKeyId,
    secretAccessKey,
    region,
  })),
});

const getLoginURL = loginToken => `${domain}/login/${loginToken}`;

// Send the login email to the provided email address
function sendLogin(to, loginToken) {
  const loginURL = getLoginURL(loginToken);

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

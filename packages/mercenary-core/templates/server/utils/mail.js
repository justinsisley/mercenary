const path = require('path');
const loglevel = require('loglevel');
const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const mjmlUtils = require('mjml-utils');
const config = require('../config');

// const emailTemplateDir = path.join(__dirname, '../../email/');
const emailTemplateDir = path.join(__dirname, '../../../../../../playground/test-app/email/');

// Configure SES transport for nodemailer
const ses = sesTransport({
  accessKeyId: config.email.ses.accessKeyId,
  secretAccessKey: config.email.ses.secretAccessKey,
  region: config.email.ses.region,
});

// Configure mail sending utils
mjmlUtils.sendmail.config({
  fromAddress: config.email.fromAddress,
  transport: nodemailer.createTransport(ses),
});

// Send the signup email to the provided email address
function sendSignup(to, signupToken) {
  const signupURL = `${config.domain}/verify/${signupToken}`;

  return mjmlUtils.sendmail({
    to,
    subject: 'App Signup',
    text: `Go to ${signupURL} to verify your account.`,
    template: path.join(emailTemplateDir, 'signup.mjml'),
    data: { signupURL },
    onError: (error) => {
      loglevel.error(error);
    },
  });
}

// Send the login email to the provided email address
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
  sendSignup,
  sendLogin,
};

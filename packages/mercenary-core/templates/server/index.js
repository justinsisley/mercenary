const router = require('express').Router;
const mongoose = require('mongoose');
const tokenpress = require('tokenpress');
const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const mjmlUtils = require('mjml-utils');
const config = require('./config');
const authController = require('./controllers/auth');

// Configure MongoDB
const mlab = config.mlab;
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mlab.username}:${mlab.password}@${mlab.server}`);

// Configure JWT authentication middleware and utils
tokenpress.configure({
  secret: config.jwt.secret,
  expiresIn: config.jwt.expiresIn,
});

// Configure SES transport for nodemailer
const transport = nodemailer.createTransport(
  sesTransport({
    accessKeyId: config.email.ses.accessKeyId,
    secretAccessKey: config.email.ses.secretAccessKey,
    region: config.email.ses.region,
  }),
);

// Configure mail sending utils
mjmlUtils.sendmail.config({
  fromAddress: config.email.fromAddress,
  transport,
});

// Create main application router
const rootRouter = router();

// Register controllers
rootRouter.use(authController);

module.exports = rootRouter;

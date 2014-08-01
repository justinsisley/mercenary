var config          = require('../../../config');
var mandrillApiKey  = (process.env.MANDRILL_APIKEY || config.secrets.mandrillApiKey);
var mandrill        = require('node-mandrill')(mandrillApiKey);
var nodemailer      = require('nodemailer');
var smtpService     = (process.env.SMTP_SERVICE || config.secrets.smtp.service);
var smtpUsername    = (process.env.SMTP_USERNAME || config.secrets.smtp.username);
var smtpPassword    = (process.env.SMTP_PASSWORD || config.secrets.smtp.password);
var smtpTransport   = nodemailer.createTransport('SMTP', {
    auth: {
        service : smtpService,
        user    : smtpUsername,
        pass    : smtpPassword
    }
});

module.exports = {
    // Render a Dust template
    renderTemplate: function(templateName, data, callback) {
        // Load the initialized Express app
        // so we can use its `render` method.
        var app = require('../../app').app;

        app.render(templateName, data, function(err, out) {
            if (err) {
                return callback && callback(err);
            }

            return callback && callback(null, out);
        });
    },

    // Attempts to use Mandrill, then uses
    // NodeMailer as a fallback.
    sendEmail: function(settings, callback) {
        console.log('sendEmail');

        if (mandrillApiKey) {
            return this.sendEmailMandrill(settings, callback);
        } else {
            return this.sendEmailNodeMailer(settings, callback);
        }
    },

    sendEmailMandrill: function(settings, callback) {
        var fromEmail = (process.env.FROM_ADDRESS || config.settings.email.fromAddress);
        var fromName = (process.env.FROM_NAME || config.settings.email.fromName);

        mandrill('/messages/send', {
            message: {
                from_email  : fromEmail,
                from_name   : fromName,
                to          : [{email: settings.to}],
                subject     : settings.subject,
                text        : settings.text,
                html        : settings.html
            }
        }, function(err, res) {
            if (err) {
                return callback && callback(err);
            }

            return callback && callback(null, res);
        });
    },

    sendEmailNodeMailer: function(settings, callback) {
        var fromEmail = (process.env.FROM_ADDRESS || config.settings.email.fromAddress);

        var options = {
            from    : fromEmail,
            to      : settings.to,
            subject : settings.subject,
            text    : settings.text,
            html    : settings.html
        };

        smtpTransport.sendMail(options, function(err, res) {
            if (err) {
                return callback && callback(err);
            }

            return callback && callback(null, res);
        });
    }
};
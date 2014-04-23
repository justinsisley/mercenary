var config          = require('../../../config'),
    mandrill        = require('node-mandrill')(process.env.MANDRILL_APIKEY || config.secrets.mandrillApiKey),
    nodemailer      = require('nodemailer'),
    smtpTransport   = nodemailer.createTransport('SMTP', {
        auth: {
            service : process.env.SMTP_SERVICE || config.secrets.smtp.service,
            user    : process.env.SMTP_USERNAME || config.secrets.smtp.username,
            pass    : process.env.SMTP_PASSWORD || config.secrets.smtp.password
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
        if (process.env.MANDRILL_APIKEY || config.secrets.mandrillApiKey) {
            this.sendEmailMandrill(settings, callback);
        } else {
            this.sendEmailNodeMailer(settings, callback);
        }
    },

    sendEmailMandrill: function(settings, callback) {
        mandrill('/messages/send', {
            message: {
                from_email  : process.env.FROM_ADDRESS || config.settings.email.fromAddress,
                from_name   : process.env.FROM_NAME || config.settings.email.fromName,
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
        var options = {
            from    : process.env.FROM_ADDRESS || config.settings.email.fromAddress,
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
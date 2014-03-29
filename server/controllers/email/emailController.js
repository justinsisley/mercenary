var config          = require('../../config'),
    dust            = require('dustjs-linkedin'),
    mandrill        = require('node-mandrill')(config.MANDRILL_API_KEY),
    nodemailer      = require('nodemailer'),
    smtpTransport   = nodemailer.createTransport('SMTP', {
        auth: {
            service : config.SMTP_SERVICE,
            user    : config.SMTP_USERNAME,
            pass    : config.SMTP_PASSWORD
        }
    });

module.exports = {
    // Take an object and interpolate
    // it into the dust template.
    renderTemplate: function(templateName, data, callback) {
        dust.render(templateName, data, function(err, out) {
            if (err) {
                return callback && callback(err);
            }

            return callback && callback(err, out);
        });
    },

    // Attempts to use Mandrill, then uses
    // NodeMailer as a fallback.
    sendEmail: function(settings, callback) {
        if (config.MANDRILL_API_KEY) {
            this.sendEmailMandrill(settings, callback);
        } else {
            this.sendEmailNodeMailer(settings, callback);
        }
    },

    sendEmailMandrill: function(settings, callback) {
        mandrill('/messages/send', {
            message: {
                from_email  : config.FROM_ADDRESS,
                from_name   : config.FROM_NAME,
                to          : [{email: settings.to}],
                subject     : settings.subject,
                text        : settings.text,
                html        : settings.html
            }
        }, function(err, res) {
            if (err) {
                return callback && callback(err);
            }

            return callback && callback(err, res);
        });
    },

    sendEmailNodeMailer: function(settings, callback) {
        var options = {
            from    : config.FROM_ADDRESS,
            to      : settings.to,
            subject : settings.subject,
            text    : settings.text,
            html    : settings.html
        };

        smtpTransport.sendMail(options, function(err, res) {
            if (err) {
                return callback && callback(err);
            }

            return callback && callback(err, res);
        });
    }
};
/**
 * The primary server configuration file is set
 * up to work nicely with Heroku right out of
 * the box. While these properties are used across
 * the server, they can get their values any way
 * you'd like, so you're certainly not tied to
 * any particular hosting provider.
 */
module.exports = {
    PORT: process.env.PORT || 8743,
    ENV: process.env.NODE_ENV || 'development',

    SESSION_SECRET: process.env.SESSION_SECRET || 'Your session secret',

    // Log all request information to the console.
    LOG_REQUESTS: false,

    // Toggle the logging of leaks and garbage collection activity.
    // By default, these simply log to the console.
    LOG_GARBAGE: false,
    LOG_LEAKS: false,

    DOMAIN: (function() {
        // If we're in a development environment, construct
        // the application's web address at run time based
        // on the system's host name.
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return '127.0.0.1';
        }

        // If we're not in development, use the home page
        // property in the package.json file.
        // You could also hard-code this to suit your needs.
        // If you're using Heroku, this should be your 
        // Heroku domain.
        return 'mercenary-app.herokuapp.com';
    })(),

    // By default, this is configured to work out of the
    // box with Heroku and the MongoLab addon.
    // It's not recommended to put your MongoDB URI here
    // as a string, since it contains the username and password.
    // Instead, you should set up an environment variable for 
    // MONGOLAB_URI. Both ways work, but the environment
    // variables keeps your DB credentials out of the repository.
    DB_URI: process.env.MONGOLAB_URI || '',

    // If set to true, forces client-side JavaScript and
    // CSS to load in their unbuilt, unminified states.
    // This also means JavaScript is loaded via AMD.
    // When set to true, the application can be deployed
    // straight to Heroku without making any changes or
    // setting up any additional accounts. That said,
    // it's highly recommended that you concatenate,
    // minify, and push assets to a CDN.
    FORCE_DEV_ASSETS: false,

    // If set to true, forces client-side JavaScript and
    // CSS to load in their compiled and minified states.
    // Useful for testing built files locally.
    // This will override FORCE_DEV_ASSETS, so if both
    // are set to true, FORCE_PRD_ASSETS will win.
    FORCE_PRD_ASSETS: false,

    // Static asset versions. Don't edit these directly.
    // They'll automatically update when corresponding
    // files change.
    JAVASCRIPT_VERSION: 101,
    CSS_VERSION: 106,

    // Amazon S3 settings for pushing compiled and minified
    // static assets to the cloud. Used by grunt-s3 task.
    AMAZON_S3_KEY: 'Your S3 Key',
    AMAZON_S3_SECRET: 'Your S3 Secret',
    AMAZON_S3_BUCKET: 'Your S3 Bucket',
    AMAZON_S3_REGION: 'Your S3 Region (e.g. us-east-1)',

    // CDN domain where your static assets are hosted.
    // If you're using S3, you're probably going to
    // create a CloudFront distribution associated
    // with your S3 bucket.
    CDN_DOMAIN: 'Your CDN Domain',

    // Set up a Google Analytics and add your tracker ID.
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS || 'UA-########-#',

    // The email address and name to send emails from.
    FROM_ADDRESS: process.env.FROM_ADDRESS || 'Mercenary App Framework <mercenaryapp@gmail.com>',
    FROM_NAME: process.env.FROM_NAME || 'Mercenary App Framework',

    // Set up a free Mandrill account and add your API key.
    // If you don't use Mandrill, or implement some other
    // service, email sending will fall back to NodeMailer.
    MANDRILL_API_KEY: process.env.MANDRILL_APIKEY || '',

    // SMTP settings used when sending mail via NodeMailer.
    // See https://github.com/andris9/Nodemailer for information
    // on what values belong here.
    // If you're using Mandrill, you'll probably only need
    // these for your development environment.
    SMTP_SERVICE: process.env.SMTP_SERVICE || 'Gmail',
    SMTP_USERNAME: process.env.SMTP_USERNAME || 'Your SMTP username',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || 'Your SMTP password',

    // Service-based authentication.
    // Delete what you don't need. For each of the services
    // that you utilize, you'll need to create a developer
    // account and get the necessary information and either 
    // set the appropriate environment variables or fill in
    // the values as strings below.
    AUTH_FACEBOOK_ENABLED: true,
    AUTH_FACEBOOK: {
        clientID            : process.env.FACEBOOK_CLIENT_ID || 'Your App ID',
        clientSecret        : process.env.FACEBOOK_CLIENT_SECRET || 'Your App Secret',
        callbackURL         : '/auth/facebook/callback',
        passReqToCallback   : true
    },

    AUTH_GOOGLE_ENABLED: true,
    AUTH_GOOGLE: {
        clientID            : process.env.GOOGLE_CLIENT_ID || 'Your Client ID',
        clientSecret        : process.env.GOOGLE_CLIENT_SECRET || 'Your Client Secret',
        callbackURL         : '/auth/google/callback',
        passReqToCallback   : true
    },

    AUTH_TWITTER_ENABLED: true,
    AUTH_TWITTER: {
        consumerKey         : process.env.TWITTER_CONSUMER_KEY || 'Your Consumer Key',
        consumerSecret      : process.env.TWITTER_CONSUMER_SECRET || 'Your Consumer Secret',
        callbackURL         : '/auth/twitter/callback',
        passReqToCallback   : true
    },
    
    AUTH_GITHUB_ENABLED: true,
    AUTH_GITHUB: {
        clientID            : process.env.GITHUB_CLIENT_ID || 'Your Client ID',
        clientSecret        : process.env.GITHUB_CLIENT_SECRET || 'Your Client Secret',
        callbackURL         : '/auth/github/callback',
        passReqToCallback   : true
    }
};
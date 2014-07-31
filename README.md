# Mercenary [![Build Status](http://img.shields.io/travis/justinsisley/Mercenary.svg?style=flat&branch=Cajon)](http://img.shields.io/travis/justinsisley/Mercenary.svg?style=flat&branch=Cajon)

![Mercenary](https://dl.dropboxusercontent.com/u/4682832/Mercenary/mercenary-screenshot.jpg)

Mercenary is a full-featured, single-page web application. Bend it to your will and make something beautiful.

On the client side, Mercenary uses [Backbone.js](http://backbonejs.org/) with [Marionette](http://marionettejs.com/), [requirejs](http://requirejs.org/) for dependency injection, [LESS](http://lesscss.org/) for CSS preprocessing, [Bower](http://bower.io/) for dependency management, and [Gulp](http://gulpjs.com/) as a build and deploy utility. It also leverages livereload, which automatically reloads updated CSS files without needing a manual refresh.

On the server side, it uses [Express](http://expressjs.com/), a popular [Node.js](http://nodejs.org/) application framework.

Both the client and server utilize [LinkedIn's fork of Dust.js](http://linkedin.github.io/dustjs/) for template rendering.

The entire stack is test-ready, using [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/), with test runners in both the command line and the browser.

## Installation

If you're using [Homebrew](http://mxcl.github.io/homebrew/), setting up Mercenary takes less than 2 minutes.

If Homebrew isn't your cup of tea, you'll just need to [install Node.js and NPM](http://nodejs.org/) manually. From there, NPM has you covered.

These instructions assume you have some familiarity with using a command line application.

- Install Node.js and NPM: `brew install node`
- Install Gulp and Bower: `npm install -g gulp bower`
- Install Mocha, PhantomJS and Mocha-Phantom: `npm install -g mocha phantomjs mocha-phantomjs`
- [Download Mercenary](https://github.com/justinsisley/Mercenary/archive/master.zip)
- Unzip the archive: `unzip Mercenary-master.zip`
- Move into the project's root: `cd Mercenary-master`
- Install dependencies: `npm install`

## Running Mercenary

Mercenary provides you with three distinct ways to start the application: using regular ol' Node.js, using [nodemon](http://nodemon.io/), or using [node-inspector](https://github.com/node-inspector/node-inspector).

Running the application with nodemon will cause the Express server to restart upon any server-side code changes, saving you from manual restart-madness. Changes to client-side code won't trigger a server restart.

Running the server with node-inspector will provide you with a debugging interface nearly identical to the Chrome Developer Tools. This is very useful when you have a debugging itch that `console.log` can't quickly scratch.

In the end, the choice is yours, and all three methods of running the server are available via custom Gulp tasks.

*Each of the following tasks automatically runs the Gulp watcher, which provides JavaScript linting via [JSHint](http://www.jshint.com/), LESS linting via [RECESS](http://twitter.github.io/recess/), concatenation and compilation of stylesheets and templates, and livereload, so style changes don't require a browser refresh.*

- `gulp dev` - start the application using node.
- `gulp devdemon` - start the application using nodemon<sup>1</sup>.
- `gulp devinspect` - start the application using node-inspector<sup>2</sup>.

Once the server is running, you can view your application at <http://127.0.0.1:8743>.

<sup>1</sup> To use nodemon, you must install it: `npm install -g nodemon`

<sup>2</sup> To use node-inspector, you must install it: `npm install -g node-inspector`

## Configuration

Mercenary uses two separate and distinct configuration files:

- `settings.json` - used for non-sensitive configurations, including environment, port and domain settings.
- `secrets.json` - used for - you guessed it - secret things. This includes information such as your application's session secret, DB URI, and third-party API keys. `secrets.json` is ignored by Git, since the information contained within it shouldn't be pushed to your repository. Initially, you are provided with an example secrets configuration, named `secrets_example.json`. You should rename this example file to `secrets.json` and substitute its values for your own.

In addition to the two configuration files above, Mercenary also attempts to pull some values from the environment via `process.env`. If these values are not configured in your environment, Mercenary will fall back to your configuration files' values. For remote environments, such as production, it is recommended that you set the following environment variables:

##### Application and Database

- `NODE_ENV` - your server environment. By default, Mercenary handles "development" and "production".
- `PORT` - when deploying to Heroku, this will be set automatically.
- `SESSION_SECRET` - your session secret.
- `MONGOLAB_URI` - when deploying to Heroku with the MongoLab addon, this will be set automatically.

*If the `MONGOLAB_URI` property is left empty, Mercenary will fall back to a file system implementation of MongoDB, using [TingoDB](http://www.tingodb.com/).*

##### Email Handling

*You only need to use Mandrill __or__ an SMTP service, not both. For example, you might use Mandrill in production, but use your personal email credentials during development.*

- `FROM_ADDRESS` - the email address your application will display when it sends email.
- `FROM_NAME` - the name your application will display when it sends email.
- `MANDRILL_APIKEY` - your Mandrill API key. When deploying to Heroku with the Mandrill addon, this will be set automatically.
- `SMTP_SERVICE` - the SMTP service to use when sending emails.
    - [Options](https://github.com/andris9/Nodemailer): 'Gmail', 'Yahoo', 'Hotmail', 'hot.ee', 'mail.ee', 'SES', 'Zoho', 'iCloud', 'SendGrid', 'Mailgun', 'Postmark', 'yandex', 'Mail.Ru', 'DynectEmail', 'Mandrill', 'Mailjet', 'QQ', 'QQex', 'Godaddy', 'GodaddyEurope', 'GodaddyAsia', 'FastMail', 'SendCloud'
- `SMTP_USERNAME` - the SMTP username used to sign into your SMTP service.
- `SMTP_PASSWORD` - the SMTP password used to sign into your SMTP service.

##### Third-party Services

- `GA_TRACKER` - your Google Analytics tracker ID.
- `FACEBOOK_CLIENT_ID` - your Facebook application's client ID.
- `FACEBOOK_CLIENT_SECRET` - your Facebook application's client secret.
- `GOOGLE_CLIENT_ID` - your Google application's client ID.
- `GOOGLE_CLIENT_SECRET` - your Google application's client secret.
- `TWITTER_CONSUMER_KEY` - your Twitter application's consumer key.
- `TWITTER_CONSUMER_SECRET` - your Twitter application's consumer secret.
- `GITHUB_CLIENT_ID` - your Github application's client ID.
- `GITHUB_CLIENT_SECRET` - your Github application's client secret.
- `LINKEDIN_CLIENT_ID` - your LinkedIn application's client ID.
- `LINKEDIN_CLIENT_SECRET` - your LinkedIn application's client secret.
- `INSTAGRAM_CLIENT_ID` - your Instagram application's client ID.
- `INSTAGRAM_CLIENT_SECRET` - your Instagram application's client secret.

## Browser Support

Mercenary is built with modern web technologies at its core. While it may work in older browsers, the targeted browsers and versions are:

- Chrome 27+
- Firefox 20+
- Safari 6+
- Opera 12+
- Internet Explorer 10+

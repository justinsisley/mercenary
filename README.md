## The Holy Grail
This is a fully-functioning single-page web application. Bend it to your will and make something beautiful.

On the client, this application uses [Backbone.js](http://backbonejs.org/) with [Marionette](http://marionettejs.com/), [requirejs](http://requirejs.org/) for dependency injection, [LESS](http://lesscss.org/) for CSS preprocessing, [Bower](http://bower.io/) for dependency management, and [Grunt](http://gruntjs.com/) as a build and deploy utility. It also takes advantage of the [Grunt watcher's live reload capability](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload), which automatically reloads updated CSS files without needing a manual refresh.

On the server side, it uses [Express](http://expressjs.com/), a popular [Node.js](http://nodejs.org/) application framework.

Both the client and server utilize [LinkedIn's fork of Dust.js](http://linkedin.github.io/dustjs/) for template rendering.

The entire stack is test-ready, using [Mocha](http://visionmedia.github.io/mocha/) with [Chai](http://chaijs.com/), with test runners in both the command line and the browser.

### Setting up your development environment on OS X
- [Install Homebrew](http://mxcl.github.io/homebrew/)
- Install Node.js and NPM: `brew install node`
- Install Grunt and Bower: `npm install -g grunt-cli bower`
- Install Mocha, PhantomJS and Mocha-Phantom: `npm install -g mocha mocha-phantomjs phantomjs`
- Clone this repository and move into its root directory
- Install dependencies: `npm install; bower install`
- Start the local server: `node server/server.js`
- In another terminal window (from the project's root directory), run `grunt watch`
- Visit <http://localhost:8743>

### Managing dependencies
- Use bower.json to edit, update and declare new client-side dependencies.
- Use package.json to edit, update and declare new server-side dependencies.
  - Put development dependencies under "devDependencies".
- Use proper version numbers for dependencies
  - Avoid using wild card (*) versions
  - If you don't know the latest version, use a wild card, then get the proper version number from the dependency's package.json
- If a dependency is not available via Bower, manually import it into the project within the `vendor/_nonBower` directory,
and keep a clean, organized directory structure.
- When doing "house cleaning", delete all vendor sub-directories except `_nonBower`, then re-install Bower dependencies.

### Things worth knowing
- `package.json` contains two properties that are managed via a custom Grunt task and should not be edited manually. These properties are:
  - revisionJS
  - revisionCSS
- [JSHint](http://www.jshint.com/) and [RECESS](http://twitter.github.io/recess/) are both configured to be relatively strict, and they both run via the Grunt watch task
- Mocha and Chai are used for testing both the client and the server

### Browser Support
This application is built with modern web technologies at its core. Targeted browsers and versions are:
- Chrome 27+
- Firefox 20+
- Safari 6+
- Opera 12+
- Internet Explorer 10+
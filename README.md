## Setting up your development environment on OS X (10.8.3+)
- [Install Homebrew](http://mxcl.github.io/homebrew/)
- Install Node.js and NPM: `brew install node`
- Install Grunt, Bower, Nodemon and Forever: `npm install -g grunt-cli; npm install -g bower; npm install -g nodemon; npm install -g forever`
  - [Learn about Grunt](http://gruntjs.com/)
  - [Learn about Bower](http://bower.io/)
  - [Learn about Nodemon](http://remy.github.io/nodemon/)
  - [Learn about Forever](https://github.com/nodejitsu/forever)
- Install dependencies: `npm install; bower install`
- Install Mocha: `npm install -g mocha`
- Install PhantomJS and Mocha-Phantom: `npm install -g mocha-phantomjs phantomjs`
- Run `grunt` for good measure
- Start the local server: `node server/server.js`
- In another terminal window, run `grunt watch`
- Visit <http://localhost:8743>

## Managing dependencies
- Use bower.json to edit, update and declare new client-side dependencies.
- Use package.json to edit, update and declare new server-side dependencies.
  - Put development dependencies under "devDependencies".
- Use proper version numbers for dependencies
  - Avoid using wild card (*) versions
  - If you don't know the latest version, use a wild card, then get the proper version number from the dependency's package.json
- If a dependency is not available via Bower, manually import it into the project within the `vendor/_nonBower` directory,
and keep a clean, organized directory structure.
- When doing "house cleaning", delete all vendor sub-directories except `_nonBower`, then re-install Bower dependencies.

## Things worth knowing
- `package.json` contains two properties that are managed via a custom Grunt task and should not be edited manually. These properties are:
  - revisionJS
  - revisionCSS
- [JSHint](http://www.jshint.com/) and [RECESS](http://twitter.github.io/recess/) are both configured to be relatively strict, and they both run via the Grunt watch task

## Browser Support
This application is built with modern web technologies at its core. Targeted browsers and versions are:
- Chrome 27+
- Firefox 20+
- Safari 6+
- Opera 12+
- Internet Explorer 10+
## The Holy Grail
This is a fully-functioning single-page web application. Bend it to your will and make something beautiful.

On the client side, this application uses [Backbone.js](http://backbonejs.org/) with [Marionette](http://marionettejs.com/), [requirejs](http://requirejs.org/) for dependency injection, [LESS](http://lesscss.org/) for CSS preprocessing, [Bower](http://bower.io/) for dependency management, and [Grunt](http://gruntjs.com/) as a build and deploy utility. It also takes advantage of the [Grunt watcher's live reload capability](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload), which automatically reloads updated CSS files without needing a manual refresh.

On the server side, it uses [Express](http://expressjs.com/), a popular [Node.js](http://nodejs.org/) application framework.

Both the client and server utilize [LinkedIn's fork of Dust.js](http://linkedin.github.io/dustjs/) for template rendering.

The entire stack is test-ready, using [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/), with test runners in both the command line and the browser.

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

### Understanding the Architecture
1. Server vs. client
2. The concept of client side "modules"
3. The concept of client side "helpers"
4. The concept of client side "widgets"
5. The `/client/vendor/` directory

### Directory structure
This project uses a directory structure that is meant to keep the application organized and manageable. Starting from the root directory, the four primary directories are `/client/`, `/server/`, `/test/`, and `/utils/`. `/client/`, `/server/`, and `/test/` should be fairly self-explanatory, but `/utils/` may need some explaining. The `/utils/` directory is where you can keep things such as custom Grunt tasks and deploy scripts. Another way to look at the `/utils/` directory is this: if it doesn't make sense to put something into the `/client/`, `/server/`, or `/test/` directories, but some part of your application or development work flow depends on it, it probably belongs in `/utils/`.

Inside the `/client/` directory, we have the following directories: `/css/`, `/dust/`, `/img/`, `/js/` and `/less/`. `/css/` contains the main compiled CSS stylesheet (`style.css`) and icon font files. You'll never need to edit `style.css`, since it's built from your LESS files.

Icon fonts are managed with IcoMoon. It's extremely easy to use, provides you with a large library of icons, and allows you to add your own. To update your icon font, make a new set in IcoMoon (or import your current set and make changes from the IcoMoon web application), download the new icon font, unzip the archive, then move it into the `/css/` directory.

The `/dust/` directory contains the `.dust` files that will be compiled into client-side JavaScript templates. Compilation is performed exclusively during the development process using a custom Grunt task. Templates are compiled into their corresponding `/client/js/modules/.../templates/` directory, with the `...` being replaced by the name of the owning module.

For example, if you create a module inside of `/client/js/modules/` called `sidebar`, and your module requires a template, you would create a directory called `sidebar` within the `/client/dust/` directory, then create your `sidebar.dust` file within that directory. With Grunt's "watch" task running, saving your new `.dust` file will automatically create the `/client/js/modules/sidebar/templates/` directory, and your compiled JavaScript template file will be placed there. This whole process may seem counterintuitive to some, but it allows us to keep a clear separation between JavaScript and Dust files, while maintaining a common directory structure for our modules. Once your templates are compiled, you will simply `require` the compiled template in any JavaScript file that needs it. This allows everyone involved (Dust and requirejs) to perform exactly the function they are meant to serve, and nothing more.

The `/img/` directory should really only be used to serve images during development, since it's best not to burden Express by having it serve lots of static image files. For many reasons, it would be best to have your production assets served from either a CDN, or from something like [Nginx](http://wiki.nginx.org/Main), which is great at serving static files. The local `/img/` directory can be convenient when working from places like planes, trains, and automobiles, where being productive offline requires you to work in a purely local development environment. By default, this directory contains a sample "for placement only" image.

The `/js/` directory is where your application's JavaScript lives. This directory is further broken down into four subdirectories: `/helpers/`, `/modules/`, `/vendor/` and `/widgets/`. Additionally, the `/client/js/` directory contains three essential JavaScript files: `app.js`, `config.js` and `main.js`.

The `less` directory...

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

### Browser Support
This application is built with modern web technologies at its core. While it may work in older browsers, the targeted browsers and versions are:
- Chrome 27+
- Firefox 20+
- Safari 6+
- Opera 12+
- Internet Explorer 10+
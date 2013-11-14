## Mercenary
Mercenary is a fully-functioning single-page web application. Bend it to your will and make something beautiful.

On the client side, this application uses [Backbone.js](http://backbonejs.org/) with [Marionette](http://marionettejs.com/), [requirejs](http://requirejs.org/) for dependency injection, [LESS](http://lesscss.org/) for CSS preprocessing, [Bower](http://bower.io/) for dependency management, and [Grunt](http://gruntjs.com/) as a build and deploy utility. It also takes advantage of the [Grunt watcher's live reload capability](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload), which automatically reloads updated CSS files without needing a manual refresh.

On the server side, it uses [Express](http://expressjs.com/), a popular [Node.js](http://nodejs.org/) application framework.

Both the client and server utilize [LinkedIn's fork of Dust.js](http://linkedin.github.io/dustjs/) for template rendering.

The entire stack is test-ready, using [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/), with test runners in both the command line and the browser.

For more information, check out the [Wiki](https://github.com/justinsisley/Mercenary/wiki).

### Browser Support
This application is built with modern web technologies at its core. While it may work in older browsers, the targeted browsers and versions are:
- Chrome 27+
- Firefox 20+
- Safari 6+
- Opera 12+
- Internet Explorer 10+

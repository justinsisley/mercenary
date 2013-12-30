# The Client Directory

Inside the `/client` directory, we have the following directories: `css`, `dust`, `img`, `js` and `less`. 

`/client/css` contains the main compiled CSS stylesheet (`style.css`) and icon font files. You'll never need to edit `style.css`, since it's automatically built from your LESS files. The built `style.css` file is ignored using .gitignore to avoid unnecessary conflicts.

Icon fonts are managed with [Fontello](http://fontello.com/). It's extremely easy to use, provides you with a large library of icons, and allows you to add your own custom-designed icons. To update your icon font, make a new set in Fontello (or import your current set and make changes from the Fontello web application), download the new icon font, unzip the archive, rename the directory to `fontello`, then move it into the `/css` directory. Note that you can use any name for the font directory, but that name must be referenced in the stylesheet include inside of `/server/dust/app.dust`. By default, it is referencing `/css/fontello/css/fontello.css`.

The `/client/dust` directory contains the `.dust` files that will be compiled into client-side JavaScript templates. Compilation is performed exclusively during the development process using a custom Grunt task. Templates are compiled into their corresponding `/client/js/modules/.../templates` directory, with the `...` being replaced by the name of the owning module.

For example, if you create a module inside of `/client/js/modules` called `sidebar`, and your module requires a template, you would create a directory called `sidebar` within the `/client/dust` directory, then create your `sidebar.dust` file within that directory. With Grunt's "watch" task running, saving your new `.dust` file will automatically create the `/client/js/modules/sidebar/templates` directory, and your compiled JavaScript template file will be placed there. This whole process may seem counterintuitive to some, but it allows us to keep a clear separation between JavaScript and Dust files, while maintaining a common directory structure for our modules. Once your templates are compiled, you will simply `require` the compiled template in any JavaScript file that needs it. This allows everyone involved (Dust and requirejs) to perform exactly the function they are meant to serve, and nothing more.

The `/client/img` directory should really only be used to serve images during development, since it's best not to burden Express by having it serve lots of static image files. For many reasons, it would be best to have your production assets served from either a CDN, or from something like [Nginx](http://wiki.nginx.org/Main), which is great at serving static files. The `/client/img` directory can be convenient when working from places like planes, trains, and automobiles, where being productive offline requires you to work in a purely local development environment. By default, this directory contains a sample "for placement only" image.

The `/client/js` directory is where your application's JavaScript lives. This directory is further broken down into four subdirectories: `helpers`, `modules`, `vendor` and `widgets`. Additionally, the `/client/js` directory contains three essential JavaScript files: `app.js`, `config.js` and `main.js`. The three files are discussed in the section [Understanding the Architecture](https://github.com/justinsisley/Mercenary/wiki/Understanding-the-Architecture), but can be summarized as `app.js` being the core of the Marionette application, `main.js` being the primary entry point of your application, and `config.js` being the requirejs configuration file.

Starting with the simplest-to-explain subdirectories, The `/client/js/helpers` directory contains your JavaScript helper files, and the `/client/js/widgets` directory contains your standalone JavaScript widgets. These are explained in detail in the section [Understanding the Architecture](https://github.com/justinsisley/Mercenary/wiki/Understanding-the-Architecture).

The `/client/js/modules` directory, covered in [Understanding the Architecture](https://github.com/justinsisley/Mercenary/wiki/Understanding-the-Architecture), is where your application's specific functionality lives. Each "module" is a directory that contains module-specific models, collections, controllers, routers and views. Applications typically consist of multiple modules performing their duties independently of each other, with cross-module communication happening via the event aggregator (also covered in [Understanding the Architecture](https://github.com/justinsisley/Mercenary/wiki/Understanding-the-Architecture)).

The `/client/less` directory contains the LESS files that your main CSS file is built from. Like the other upper-level directories, it contains several subdirectories that are meant to keep things organized and purposeful.

The `/client/less/modules` directory is where module-specific LESS stylesheets are kept, and it should follow a directory structure similar to your JavaScript modules and Dust templates. The scheme is pretty simple. There should generally be a 1:1:1 relationship between the directory names within your `/client/js/modules` directory, your `/client/dust` directory, and your `/client/less/modules` directory.

The `/client/less/elements` directory is where element-specific LESS stylesheets are kept, for example, `buttons.less`, or `links.less`.

The `/client/less/pages` directory is where you can store page-specific styles, if your application has the concept of "pages". For example, perhaps your "About" page changes the size of your site's header, or overrides other styles in some way.

The `/client/less/theme` directory is where brand-specific, or design-specific LESS stylesheets are stored, such as color variables, font family declarations, and other global styles used widely across the application.

The `/client/less/utils` directory is a place to store LESS utilities, such as back gradient generators, animation mixins, and resets.

The `/client/vendor` directory is where your client side dependencies are stored. These dependencies are either installed via Bower, or are manually imported into the `/client/vendor/_nonBower` directory. This is covered in more detail in [Managing Dependencies](https://github.com/justinsisley/Mercenary/wiki/Managing-Dependencies).
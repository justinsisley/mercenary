# The LESS Directory

The `/client/less` directory contains the LESS files that your main CSS file is built from. Like the other upper-level directories, it contains several subdirectories that are meant to keep things organized and purposeful.

The `/client/less/modules` directory is where module-specific LESS stylesheets are kept, and it should follow a directory structure similar to your JavaScript modules and Dust templates. The scheme is pretty simple. There should generally be a 1:1:1 relationship between the directory names within your `/client/js/modules` directory, your `/client/dust` directory, and your `/client/less/modules` directory.

The `/client/less/elements` directory is where element-specific LESS stylesheets are kept, for example, `buttons.less`, or `links.less`.

The `/client/less/pages` directory is where you can store page-specific styles, if your application has the concept of "pages". For example, perhaps your "About" page changes the size of your site's header, or overrides other styles in some way.

The `/client/less/theme` directory is where brand-specific, or design-specific LESS stylesheets are stored, such as color variables, font family declarations, and other global styles used widely across the application.

The `/client/less/utils` directory is a place to store LESS utilities, such as back gradient generators, animation mixins, and resets.
# The Utils Directory

The `/utils` directory is where you can keep things such as Grunt tasks and deploy scripts. A simple rule of thumb for the `/utils` directory is this: if it doesn't make sense to put something into the `/client`, `/server`, or `/test` directories, but some part of your application or development work flow depends on it, it probably belongs in `/utils`.

All Grunt tasks are broken down into individual modules for easier management. Have a look through the `grunt-tasks` directory.
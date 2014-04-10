var exec = require('child_process').exec;

// Check out a new "deploy" branch.
// Merge from master into "deploy".
// If FORCE_DEV_ASSETS is true,
// remove the "postinstall" hook
// from package.json
// Run CDN, commit to deploy with
// version information:
// v0.1.2 (JSv122, CSSv459)

module.exports = function(grunt) {
    var CONFIG_FILE = 'server/config.js',
        configFile = grunt.file.read(CONFIG_FILE);

    grunt.registerTask('heroku-deploy', 'Deploy to Heroku.', function() {
        var pattern = /FORCE_DEV_ASSETS[ ]*:[ ]*(true|false)/i,
            forceDevAssets = pattern.exec(configFile)[1];

        if (forceDevAssets === 'false') {
            // remove "postinstall": "./node_modules/bower/bin/bower install" from package.json
            console.log('Deploying to Heroku with development JavaScript and CSS.');
        }

        // Commits the changed package.json,
        // builds and pushes latest dependencies
        // to S3, then pushes the commit to Heroku.
        grunt.task.run(['cdn', 'gitcommit', 'gitpush']);

        // Add the "postinstall": "./node_modules/bower/bin/bower install" line back to package.json
    });
};
module.exports = function(grunt) {
    var packageJSON = require('../../package.json'),
        config = require('../../server/config');
    
    grunt.config('s3', {
        options: {
            key: config.AMAZON_S3_KEY,
            secret:  config.AMAZON_S3_SECRET,
            bucket:  config.AMAZON_S3_BUCKET,
            access: 'public-read',
            gzip: true,
            headers: {
                // 3 years
                'Cache-Control': 'max-age=87091200000'
            }
        },
        qa: {
            upload: [
                {
                    src: 'tmp/app.js',
                    dest: 'js/app.' + packageJSON.javascriptVersion + '.js',
                    gzip: true
                },
                {
                    src: 'client/css/style.css',
                    dest: 'css/style.' + packageJSON.cssVersion + '.css',
                    gzip: true
                },
                {
                    src: 'client/css/fonts.css',
                    dest: 'css/fonts.' + packageJSON.fontVersion + '.css',
                    gzip: true
                },
                {
                    src: 'client/css/fonts-' + packageJSON.fontVersion + '/*',
                    dest: 'css/fonts-' + packageJSON.fontVersion + '/',
                    gzip: true
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-s3');
};
module.exports = function(grunt) {
    var config = require('../../config');
    
    grunt.config('s3', {
        options: {
            key: config.secrets.amazonS3.key,
            secret: config.secrets.amazonS3.secret,
            bucket: config.secrets.amazonS3.bucket,
            region: config.secrets.amazonS3.region,
            access: 'public-read',
            gzip: true,
            headers: {
                // 3 years
                'Cache-Control': 'max-age=87091200000'
            }
        },
        cdn: {
            upload: [
                {
                    src: 'tmp/app.js',
                    dest: 'js/app.' + config.versions.javascript + '.js',
                    gzip: true
                },
                {
                    src: 'client/css/style.css',
                    dest: 'css/style.' + config.versions.css + '.css',
                    gzip: true
                },
                {
                    src: 'client/font/**',
                    dest: 'font/',
                    gzip: true
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-s3');
};
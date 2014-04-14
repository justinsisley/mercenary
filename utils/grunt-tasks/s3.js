module.exports = function(grunt) {
    var config = require('../../server/config');
    
    grunt.config('s3', {
        options: {
            key: config.AMAZON_S3_KEY,
            secret:  config.AMAZON_S3_SECRET,
            bucket:  config.AMAZON_S3_BUCKET,
            region: config.AMAZON_S3_REGION,
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
                    dest: 'js/app.' + config.JAVASCRIPT_VERSION + '.js',
                    gzip: true
                },
                {
                    src: 'client/css/style.css',
                    dest: 'css/style.' + config.CSS_VERSION + '.css',
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
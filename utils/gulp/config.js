var clientLibDir = 'client/vendor';
var clientSrcDir = 'client';

var config = {
    templates: [clientSrcDir + '/dust/**/*.dust'],

    jsSrc: [
        clientSrcDir + '/js/**/*.js'
    ],

    cssLib: [
        clientLibDir + '/bootstrap/dist/css/bootstrap.css',
        clientLibDir + '/font-awesome/css/font-awesome.css'
    ],

    lessSrc: [
        'client/less/utils/*.less',
        'client/less/variables/*.less',
        'client/less/elements/*.less',
        'client/less/modules/**/*.less',
        'client/less/layouts/**/*.less',
        'client/less/widgets/*.less'
    ]
};

module.exports = config;
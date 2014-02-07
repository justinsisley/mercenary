exports.router = function(server) {
    'use strict';
    
    var appController = require('../controllers/appController');

    server.get('*', appController);
};
exports.router = function(server) {
    var appController = require('../controllers/baseController');

    server.get('*', appController);
};
var passportController  = require('../controllers/passportController'),
    sessionController   = require('../controllers/users/sessionController'),
    appController       = require('../controllers/baseController');

exports.router = function(server) {
    server.get('/session', passportController.isAuthenticated, sessionController);

    server.get('*', appController);
};
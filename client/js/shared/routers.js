var HomeRouter      = require('modules/home/routers/module');
var SignupRouter    = require('modules/signup/routers/module');
var LoginRouter     = require('modules/login/routers/module');
var DashboardRouter = require('modules/dashboard/routers/module');
var ErrorsRouter    = require('modules/errors/routers/module');

module.exports = {
    start: function() {
        return {
            homeRouter      : new HomeRouter(),
            signupRouter    : new SignupRouter(),
            loginRouter     : new LoginRouter(),
            dashboardRouter : new DashboardRouter(),
            errorsRouter    : new ErrorsRouter()
        };
    }
};
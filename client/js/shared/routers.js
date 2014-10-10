var HomeRouter      = require('components/home/routers/module');
var SignupRouter    = require('components/signup/routers/module');
var LoginRouter     = require('components/login/routers/module');
var DashboardRouter = require('components/dashboard/routers/module');
var ErrorsRouter    = require('components/errors/routers/module');

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
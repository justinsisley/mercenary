var HomeRouter      = require('modules/home/routers/main');
var SignupRouter    = require('modules/signup/routers/main');
var LoginRouter     = require('modules/login/routers/main');
var DashboardRouter = require('modules/dashboard/routers/main');
var UsersRouter     = require('modules/users/routers/main');
var ErrorsRouter    = require('modules/errors/routers/main');

module.exports = {
    start: function() {
        return {
            homeRouter      : new HomeRouter(),
            signupRouter    : new SignupRouter(),
            loginRouter     : new LoginRouter(),
            dashboardRouter : new DashboardRouter(),
            usersRouter     : new UsersRouter(),
            errorsRouter    : new ErrorsRouter()
        };
    }
};
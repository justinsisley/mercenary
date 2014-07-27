var HomeRouter      = require('modules/home/routers/homeRouter');
var SignupRouter    = require('modules/signup/routers/signupRouter');
var LoginRouter     = require('modules/login/routers/loginRouter');
var DashboardRouter = require('modules/dashboard/routers/dashboardRouter');
var UsersRouter     = require('modules/users/routers/usersRouter');
var ErrorsRouter    = require('modules/errors/routers/errorsRouter');

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
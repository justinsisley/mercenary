var HomeRouter          = require('components/home/routers/module');
var SignupRouter        = require('components/auth/signup/routers/module');
var LoginRouter         = require('components/auth/login/routers/module');
var ActivationRouter    = require('components/auth/activation/routers/module');
var PasswordResetRouter = require('components/auth/passwordReset/routers/module');
var DashboardRouter     = require('components/dashboard/routers/module');
var ErrorsRouter        = require('components/errors/routers/module');

module.exports = {
    start: function() {
        return {
            homeRouter          : new HomeRouter(),
            signupRouter        : new SignupRouter(),
            loginRouter         : new LoginRouter(),
            activationRouter    : new ActivationRouter(),
            passwordResetRouter : new PasswordResetRouter(),
            dashboardRouter     : new DashboardRouter(),
            errorsRouter        : new ErrorsRouter()
        };
    }
};
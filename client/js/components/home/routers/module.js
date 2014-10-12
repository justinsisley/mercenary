var Marionette = require('marionette');
var controller = require('components/home/controllers/module');

module.exports = Marionette.AppRouter.extend({
    controller: controller,

    appRoutes: {
        '': 'home'
    }
});
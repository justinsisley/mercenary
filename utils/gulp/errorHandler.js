var gutil = require('gulp-util');
var beep = require('beepbeep');

module.exports = function(err) {
    var message = err.plugin + ': ' + err.message;

    console.warn(gutil.colors.red(message));

    beep();
}
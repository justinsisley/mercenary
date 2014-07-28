var gutil = require('gulp-util');
var beep = require('beepbeep');

module.exports = function(err) {
    beep();

    console.warn(gutil.colors.red(err.plugin + ': ' + err.message));
}
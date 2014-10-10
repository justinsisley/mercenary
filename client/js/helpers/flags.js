/**
 * Feature flags
 *
 * Turn flags on by passing the ff_on
 * query param, followed by a comma-separated
 * list of strings that represent features
 * you want to turn on.
 * Turn flags off in the same way, this time
 * by passing the ff_off query param.
 * Turn off all flags by using ff_off=*.
 *
 * Examples
 * Turn on your new user profiles and favorites features:
 * http://mercenary.io/?ff_on=user-profiles,favorites
 *
 * Turn off your comments and sticky header features:
 * http://mercenary.io/?ff_off=comments,sticky-header
 * 
 * Turn on all features:
 * http://mercenary.io/?ff_on=*
 *
 * Turn off all enabled features:
 * http://mercenary.io/?ff_off=*
 */

var _               = require('underscore');
var $               = require('jquery');
var queryString     = require('helpers/queryString')();
var storage         = require('helpers/localStorage');
var flagsOn         = queryString.ff_on;
var flagsOff        = queryString.ff_off;
var existingFlags   = storage.get('flags') || [];
var onList          = [];
var offList         = [];
var updatedFlags    = [];
var helper          = {};
var className;

if (flagsOn) {onList = flagsOn.split(',');}
if (flagsOff) {offList = flagsOff.split(',');}

// Add new flags
updatedFlags = _.union(existingFlags, onList);

// Removed flags to be turned off
updatedFlags = _.difference(updatedFlags, offList);

// Allow enabling of all flags at once
if (flagsOn === '*') {updatedFlags = ['*'];}

// Allow removal off all flags at once
if (flagsOff === '*') {updatedFlags = [];}

// Save the updated flags to localStorage
storage.set('flags', updatedFlags);

// For each flag, add a special class
// to the HTML element to enable
// application-wide style changes based
// on flags.
for (var i = updatedFlags.length - 1; i >= 0; i--) {
    className = updatedFlags[i];

    if (className === '*') {className = 'all';}

    $('html').addClass('_ff-' + className);
}

helper.isOn = function(flag) {
    var flagEnabled = false;

    // If the specified flag exists,
    // return true.
    if (updatedFlags.indexOf(flag) > -1) {
        flagEnabled = true;
    }

    // If the "all" flag exists,
    // return true.
    if (updatedFlags.indexOf('*') > -1) {
        flagEnabled = true;
    }

    return flagEnabled;
};

module.exports = helper;
var settings = require('constants/settings');
var helper = {};

helper.set = function(key, object) {
    var data = JSON.stringify(object);
    
    key = settings.LOCAL_STORAGE_PREFIX + key;

    return window.localStorage.setItem(key, data);
};

helper.get = function(key) {
    key = settings.LOCAL_STORAGE_PREFIX + key;
    
    var data = window.localStorage.getItem(key);

    return JSON.parse(data);
};

helper.delete = function(key) {
    key = settings.LOCAL_STORAGE_PREFIX + key;

    return window.localStorage.removeItem(key);
};

module.exports = helper;
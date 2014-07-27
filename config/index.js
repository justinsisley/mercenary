/**
 * Application configuration.
 * This file pulls in other resources,
 * so you don't need to edit it directly.
 * Change application settings using settings.json,
 * and add API keys and other sensitive information
 * to secrets.json, which is ignored by Git.
 * 
 * @type {Object}
 */
module.exports = {
    // Attempts to load your secrets.json file and falls
    // back to empty objects to prevent errors.
    secrets: require('./secrets.json') || {smtp: {}, auth: {facebook: {}, google: {}, twitter: {}, github: {}}},
    
    // Loads your settings.json file, which should
    // always exist.
    settings: require('./settings.json'),

    // Don't edit these directly. They're managed
    // by a custom Grunt task.
    versions: {javascript: 1137, css: 180}
};
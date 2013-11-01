var packageJSON = require('../package.json');

module.exports = {
    PORT: process.env.APPLICATION_PORT || 8743,
    ENV: process.env.APPLICATION_ENV || 'development',

    GOOGLE_ANALYTICS: {
        PRD: 'UA-########-#'
    },

    LOG_GARBAGE: true,
    LOG_LEAKS: true,

    ASSETS: {
        JS: {
            // If true, will serve the single optimized file built by r.js
            // If false, will use un-optimized AMD
            OPTIMIZED: process.env.APPLICATION_JS_OPT || false,
            REVISION: packageJSON.revisionJS
        },
        CSS: {
            REVISION: packageJSON.revisionCSS
        },
        CSS_FONT: {
            REVISION: packageJSON.revisionCSSfont
        }
    }
};
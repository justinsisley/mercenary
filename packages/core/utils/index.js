/* eslint-disable import/no-unresolved */
const fs = require('fs');
const path = require('path');
const generatePassword = require('password-generator');

const cwd = process.cwd();

// Host project's package.json file
const packageJSONRaw = fs.readFileSync(`${cwd}/package.json`, { encoding: 'utf8' });
const packageJSON = JSON.parse(packageJSONRaw);

// Host project's config.js file
const projectConfigPath = path.join(cwd, './config.js');
const projectConfig = require(projectConfigPath); // eslint-disable-line

const readFileSync = filePath => fs.readFileSync(filePath, { encoding: 'utf8' });

// Determines if a file relative to the host project's path exists
function fileExists(pathname) {
  try {
    fs.lstatSync(path.join(cwd, pathname));
    return true;
  } catch (err) {
    return false;
  }
}

// Generate a random integer
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - (min + 1))) + min;
}

// Generate a random password
function randomPassword() {
  return generatePassword(randomInt(18, 32), false);
}

// Create a lookup for static pages so we don't have to read them from disk
// on each request
function createStaticPageCache() {
  const staticPageCache = {};

  if (!projectConfig.staticPaths) {
    return staticPageCache;
  }

  projectConfig.staticPaths.forEach((staticPath) => {
    let pathName = staticPath;
    let fileName = staticPath.replace('/', '');

    if (staticPath === '/') {
      pathName = 'index';
      fileName = 'index';
    }

    staticPageCache[pathName] = readFileSync(path.join(cwd, `./public/pages/${fileName}.html`));
  });

  return staticPageCache;
}

function escapeJSON(object) {
  const string = JSON.stringify(object);

  const UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g; // eslint-disable-line

  // Mapping of unsafe HTML and invalid JavaScript line terminator chars to their
  // Unicode char counterparts which are safe to use in JavaScript strings.
  const ESCAPED_CHARS = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
  };

  const escapeUnsafeChars = unsafeChar => ESCAPED_CHARS[unsafeChar];

  return string.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);
}

module.exports = {
  packageJSON,
  projectConfig,
  readFileSync,
  fileExists,
  randomInt,
  randomPassword,
  createStaticPageCache,
  escapeJSON,
};

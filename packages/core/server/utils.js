const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

// Determines if a file relative to the host project's path exists
function fileExists(pathname) {
  try {
    fs.lstatSync(path.join(cwd, pathname));
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  fileExists,
};

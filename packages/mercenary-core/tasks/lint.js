const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();
const npmBin = path.join(cwd, './node_modules/.bin');

// Run eslint
const lint = () => {
  // Keep the output from eslint pure by catching errors thrown by execSync.
  try {
    cp.execSync(`
      "${npmBin}/eslint" \
        "${cwd}/client/**/*.js" \
        "${cwd}/server/**/*.js"
    `, { stdio: 'inherit' });
  } catch (err) { // eslint-disable-line
    process.exit(1);
  }
};

module.exports = lint;

const path = require('path');
const cp = require('child_process');
const glob = require('glob');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');

const nodeModulesPath = path.join(cwd, './node_modules/');
const eslintPath = path.join(nodeModulesPath, './eslint/bin/eslint.js');
const mochaPath = path.join(nodeModulesPath, './mocha/bin/mocha');

// Run eslint and execute Mocha tests
const test = () => {
  // Keep the output from eslint pure by catching errors thrown by execSync.
  try {
    cp.execSync(`
      "${eslintPath}" \
        "${cwd}/client/**/*.js" \
        "${cwd}/server/**/*.js"
    `, { stdio: 'inherit' });
  } catch (err) { // eslint-disable-line
    process.exit(1);
  }

  // Check for existence of test files before attempting to execute
  glob(`${cwd}/?(client|server)/**/unit.js`, (error, files) => {
    // No tests exist, we're done
    if (!files.length) {
      return;
    }

    // Keep the output from mocha pure by catching errors thrown by execSync.
    try {
      cp.execSync(`
        NODE_ENV=test "${mochaPath}" \
        --require babel-register \
        --require "${configDir}/tests/unit/compiler.js" \
        --require "${configDir}/tests/unit/setup.js" \
          "${cwd}/?(client|server)/**/unit.js"
      `, { stdio: 'inherit' });
    } catch (err) { // eslint-disable-line
      process.exit(1);
    }
  });
};

module.exports = test;

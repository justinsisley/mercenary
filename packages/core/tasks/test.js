const path = require('path');
const cp = require('child_process');
const glob = require('glob');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');

const nodeModulesPath = path.join(cwd, './node_modules/');
const mochaPath = path.join(nodeModulesPath, './mocha/bin/mocha');

// Run unit tests
const test = () => {
  // Check for existence of test files before attempting to execute
  glob(`${cwd}/?(client|server)/**/unit.js`, (error, files) => {
    // No tests exist, we're done
    if (!files.length) {
      return;
    }

    // Keep the output pure by catching errors thrown by execSync
    console.log('\nRunning Mocha...');
    try {
      cp.execSync(`
        NODE_ENV=test "${mochaPath}" \
        --require babel-register \
        --require "${configDir}/tests/unit/compiler.js" \
        --require "${configDir}/tests/unit/setup.js" \
          "${cwd}/?(client|server)/**/unit.js"
      `, { stdio: 'inherit' });
    } catch (err) {
      process.exit(1);
    }
  });
};

module.exports = test;

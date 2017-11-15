const path = require('path');
const cp = require('child_process');
const glob = require('glob');
const build = require('./build');
const startProd = require('./startProd');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config');
const nightwatch = path.join(cwd, './node_modules/nightwatch/bin/nightwatch');

const e2e = () => {
  // Check for existence of test files before attempting to execute
  glob(`${cwd}/client/**/e2e.js`, (error, files) => {
    // No tests exist, we're done
    if (!files.length) {
      return;
    }

    // Build the client
    build({ silent: true });

    // Start the production server in "static" mode, which bypasses some of the
    // standard production settings (force WWW, etc.)
    const prod = startProd({
      async: true,
      mode: 'static',
    });

    // Give the express server a few seconds to start
    // FIXME: there must be a better way...
    setTimeout(() => {
      // Keep the output from Nightwatch pure by catching errors thrown by execSync.
      // Always exit with 0 code to avoid NPM errors when linting fails.
      try {
        cp.execSync(`
          "${nightwatch}" \
            --config "${configDir}/tests/e2e/config.js" || exit 0
        `, { stdio: 'inherit' });
      } catch (err) { // eslint-disable-line
        // Kill the server
        prod.kill('SIGINT');

        process.exit(1);
      }

      // Kill the server
      prod.kill('SIGINT');
    }, 3000);
  });
};

module.exports = e2e;

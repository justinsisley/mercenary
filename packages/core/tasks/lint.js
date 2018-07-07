const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();

const nodeModulesPath = path.join(cwd, './node_modules/');
const eslintPath = path.join(nodeModulesPath, './eslint/bin/eslint.js');

const lint = () => {
  // Keep the output pure by catching errors thrown by execSync
  console.log('Running ESLint...');
  try {
    cp.execSync(`
      "${eslintPath}" \
        "${cwd}/client/**/*.js" \
        "${cwd}/server/**/*.js"
    `, { stdio: 'inherit' });
  } catch (err) {
    process.exit(1);
  }
};

module.exports = lint;

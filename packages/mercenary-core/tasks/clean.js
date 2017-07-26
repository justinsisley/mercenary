const execSync = require('child_process').execSync;

const clean = () => {
  execSync(
    'rm -rf node_modules public reports package-lock.json && npm install',
    { stdio: 'inherit' }
  );
};

module.exports = clean;

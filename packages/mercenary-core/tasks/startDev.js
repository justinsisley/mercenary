const path = require('path');
const cp = require('child_process');

const serverIndex = path.join(__dirname, '../server/index');

const start = () => {
  return cp.execSync(
    `NODE_ENV=development node --inspect ${serverIndex}`,
    { stdio: 'inherit' }
  );
};

module.exports = start;

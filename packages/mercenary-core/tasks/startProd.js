const path = require('path');
const cp = require('child_process');

const pm2 = require.resolve('.bin/pm2');
const serverIndex = path.join(__dirname, '../server/index.js');

const prod = (options = { async: false }) => {
  let exec = cp.execSync;

  if (options.async) {
    exec = cp.exec;
  }

  return exec(
    `NODE_ENV=production ${pm2} start "${serverIndex}" -i 0 --env="production"`,
    { stdio: 'inherit' }
  );
};

module.exports = prod;

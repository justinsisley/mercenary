const path = require('path');
const execSync = require('child_process').execSync;

const configDir = path.join(__dirname, '../config/storybook');

const storybook = () => {
  execSync(
    `./node_modules/.bin/start-storybook -p 9001 -c ${configDir}`,
    { stdio: 'inherit' },
  );
};

module.exports = storybook;

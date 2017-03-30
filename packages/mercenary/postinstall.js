const chalk = require('chalk');
const pkg = require('./package.json');

console.log(`
Success! Mercenary is now installed.

To create a new mercenary application, run the command:

  ${chalk.cyan('mercenary my-app')}

`);

const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

console.log(`
Success! Mercenary is now installed.

To create a new mercenary application, run the command:

  ${chalk.cyan('mercenary my-app')}

`);

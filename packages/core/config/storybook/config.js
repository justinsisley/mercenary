const glob = require('glob');

import { configure } from '@storybook/react';

const cwd = process.cwd();
const files = glob.sync(`${cwd}/client/**/story.js`);

function loadStories() {
  // eslint-disable-next-line global-require
  files.forEach(file => require(file));
}

if (files.length) {
  configure(loadStories, module);
}

const cp = require('child_process');

const cwd = process.cwd();

const artifacts = [
  'coverage',
  'reports',
  'static',
];

// Clean up artifacts.
const clean = () => {
  artifacts.forEach((artifact) => {
    cp.execSync(`rm -rf "${cwd}/${artifact}"`);
  });
};

module.exports = clean;

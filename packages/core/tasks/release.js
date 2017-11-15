/* eslint-disable import/no-unresolved */
const fs = require('fs');
const join = require('path').join;
const execSync = require('child_process').execSync;
const inquirer = require('inquirer');

const cwd = process.cwd();

// Get the values from the host project's package.json
const packagePath = join(cwd, 'package.json');
const packageData = fs.readFileSync(packagePath, { encoding: 'utf8' });
const packageJson = JSON.parse(packageData);

// Bump the package.json version
async function bumpVersion() {
  return new Promise((resolve) => {
    const [major, minor, patch] = packageJson.version.split('.').map(str => +str);

    inquirer.prompt([
      {
        type: 'list',
        name: 'version',
        message: 'Choose a release type:',
        default: 0,
        choices: [
          {
            name: `Patch    ${major}.${minor}.${patch}  ->  ${major}.${minor}.${patch + 1}`,
            value: `${major}.${minor}.${patch + 1}`,
          },
          {
            name: `Minor    ${major}.${minor}.${patch}  ->  ${major}.${minor + 1}.0`,
            value: `${major}.${minor + 1}.0`,
          },
          {
            name: `Major    ${major}.${minor}.${patch}  ->  ${major + 1}.0.0`,
            value: `${major + 1}.0.0`,
          },
        ],
      },
    ]).then(({ version }) => {
      packageJson.version = `${version}`;

      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

      resolve(version);
    });
  });
}

// Push a new tag to git
function pushGitTag(version) {
  try {
    execSync(`git add .; git commit -m"v${version}"; git tag v${version}; git push origin v${version}`, { stdio: 'ignore' });
  } catch (error) {
    // no-op
  }
}

module.exports = async () => {
  const semver = await bumpVersion();

  pushGitTag(semver);

  return semver;
};

/* eslint-disable import/no-unresolved */
const fs = require('fs');
const join = require('path').join;
const execSync = require('child_process').execSync;
const inquirer = require('inquirer');
const config = require('../config');
const utils = require('../utils');

const cwd = process.cwd();

// Get the values from the host project's package.json
const packagePath = join(cwd, 'package.json');

// Get the values from the host project's config file
const { GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN } = config;

// Display all commit messages since the last release
function getReleaseNotes() {
  const output = execSync('git log `git describe --tags --abbrev=0`..HEAD --oneline');
  const string = output.toString();
  const replaced = string.replace(/\n/g, '\n- ');
  const trimmed = replaced.slice(0, -2);

  return `- ${trimmed}`;
}

// Bump the package.json version
async function bumpVersion() {
  return new Promise((resolve) => {
    const [major, minor, patch] = utils.packageJSON.version.split('.').map(str => +str);

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
      utils.packageJSON.version = `${version}`;

      fs.writeFileSync(packagePath, JSON.stringify(utils.packageJSON, null, 2));

      resolve(version);
    });
  });
}

// Push a new tag to git
function pushGitTag(version) {
  try {
    execSync(`git add .; git commit -m"v${version}" --no-verify; git tag v${version}; git push origin v${version} --no-verify; git push --no-verify`, { stdio: 'ignore' });
  } catch (error) {
    console.log(error);
    // no-op
  }
}

// Create the release in Github
function createRelease({ semver, releaseNotes }) {
  if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
    console.log('Commits since last release:\n');
    console.log(releaseNotes);
    return;
  }

  const payload = {
    tag_name: `v${semver}`,
    name: `v${semver}`,
    body: releaseNotes,
  };

  execSync(`
    curl --silent -X POST \
    -H 'Content-type: application/json' \
    -H 'Authorization: token ${GITHUB_TOKEN}' \
    --data '${JSON.stringify(payload)}' \
    https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases
  `);
}

module.exports = async () => {
  const semver = await bumpVersion();
  const releaseNotes = getReleaseNotes();

  pushGitTag(semver);

  createRelease({ semver, releaseNotes });

  return semver;
};

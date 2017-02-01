const path = require('path');
const cp = require('child_process');
const fs = require('fs');
const arrayUniq = require('array-uniq');

const cwd = process.cwd();
const templatesDir = path.join(__dirname, '../templates');
// const boilerplateDir = path.join(__dirname, '../boilerplate');

const exec = (command) => {
  try {
    cp.execSync(command);
  } catch (err) {} // eslint-disable-line
};

const readFile = filepath => fs.readFileSync(filepath, { encoding: 'utf8' });

// Add .gitignore; modify if one exists; create if one doesn't
const gitignore = () => {
  try {
    const existingGitIgnoreData = readFile(`${cwd}/.gitignore`);
    const existingIgnores = existingGitIgnoreData.split('\n');

    const templateGitIgnoreData = readFile(`${templatesDir}/_gitignore`);
    const templateIgnores = templateGitIgnoreData.split('\n');

    const targetIgnores = arrayUniq(templateIgnores.concat(existingIgnores));
    const targetIgnoresData = targetIgnores.join('\n');
    fs.writeFileSync(`${cwd}/.gitignore`, targetIgnoresData);
  } catch (err) {
    exec(`cp "${templatesDir}/_gitignore" "${cwd}/.gitignore"`);
  }
};

// Add readme
const readme = () => {
  try {
    readFile(`${cwd}/readme.md`);
  } catch (error) {
    exec(`cp "${templatesDir}/_readme.md" "${cwd}/readme.md"`);
  }
};

// Add .babelrc without overwriting existing
// TODO: need to be able to patch existing
// const babelrc = () => {
//   try {
//     readFile(`${cwd}/.babelrc`);
//   } catch (error) {
//     exec(`cp "${templatesDir}/_babelrc" "${cwd}/.babelrc"`);
//   }
// };


// Add .eslintrc without overwriting existing
// TODO: need to be able to patch existing
// const eslintrc = () => {
//   try {
//     readFile(`${cwd}/.eslintrc`);
//   } catch (error) {
//     exec(`cp "${templatesDir}/_eslintrc" "${cwd}/.eslintrc"`);
//   }
// };

// Add .editorconfig without overwriting existing
// TODO: need to be able to patch existing
// const editorconfig = () => {
//   try {
//     readFile(`${cwd}/.editorconfig`);
//   } catch (error) {
//     exec(`cp "${templatesDir}/_editorconfig" "${cwd}/.editorconfig"`);
//   }
// };

// Add config.js
const configFile = () => {
  var configJson = {}; // eslint-disable-line
  // If config.js already exists, don't overwrite it
  try {
    configJson = require(`${cwd}/config.js`); // eslint-disable-line
    // TODO: need to be able to patch existing config.js
  } catch (err) {
    // config.js doesn't exist; create it
    const templateConfig = readFile(`${templatesDir}/_config.js`);
    fs.writeFileSync(`${cwd}/config.js`, templateConfig);
  }
};

// Set up npm scripts
const npmScripts = () => {
  try {
    const packageJson = readFile(`${cwd}/package.json`);
    const parsedPackageJson = JSON.parse(packageJson);
    const packageJsonScripts = Object.assign({}, parsedPackageJson.scripts, {
      setup: 'merc --setup',
      clean: 'merc --clean',
      test: 'merc --test',
      'test:watch': 'merc --testWatch',
      e2e: 'merc --e2e',
      build: 'merc --build',
      start: 'merc --start',
      prod: 'merc --prod',
      docker: 'merc --docker',
    });

    parsedPackageJson.scripts = packageJsonScripts;

    fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(parsedPackageJson, null, 2));
  } catch (err) {} // eslint-disable-line
};

// Set up npm dependencies for the boilerplate
// const npmDeps = () => {
//   try {
//     const boilerplatePckgJson = readFile(`${boilerplateDir}/package.json`);
//     const parsedBoilerplatePckgJson = JSON.parse(boilerplatePckgJson);
//
//     const packageJson = readFile(`${cwd}/package.json`);
//     const parsedPackageJson = JSON.parse(packageJson);
//     const packageJsonDeps = Object.assign(
//       {},
//       parsedPackageJson.dependencies,
//       parsedBoilerplatePckgJson.dependencies // eslint-disable-line
//     );
//
//     parsedPackageJson.dependencies = packageJsonDeps;
//
//     fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(parsedPackageJson, null, 2));
//   } catch (err) {} // eslint-disable-line
// };

// Basic project setup
const setup = () => {
  gitignore();
  readme();
  // babelrc();
  // eslintrc();
  configFile();
  npmScripts();
  // npmDeps();
};

module.exports = setup;

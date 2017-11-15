const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const glob = require('glob');
const build = require('./build');
const startProd = require('./startProd');

const cwd = process.cwd();
const testFile = path.join(__dirname, 'e2e.tmp.js');

const e2e = () => {
  // Check for existence of test files before attempting to execute
  glob(`${cwd}/client/**/e2e.js`, (error, files) => {
    // No tests exist, we're done
    if (!files.length) {
      return;
    }

    // Build the client
    build({ silent: true });

    // Start the production server in "static" mode, which bypasses some of the
    // standard production settings (force WWW, etc.)
    const prod = startProd({
      async: true,
      mode: 'static',
    });

    let testContent = `
      const puppeteer = require('puppeteer');
      const { describe, before, after, it } = require('mocha');
      const { assert } = require('chai');

      let browser;
      let page;

      before(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
      });
    `;

    files.forEach((filePath) => {
      const content = fs.readFileSync(filePath, { encoding: 'utf8' });

      testContent += `\n\n${content}`;
    });

    testContent += `
      after(() => {
        browser.close();
      });
    `;

    // Write the temporary test file
    fs.writeFileSync(testFile, testContent);

    // Give the server a moment to start
    setTimeout(() => {
      // Keep the output pure by wrapping in try/catch
      try {
        cp.execSync(`mocha ${testFile}`, { stdio: 'inherit' });
      } catch (error) {} // eslint-disable-line

      fs.unlinkSync(testFile);

      // Kill the server
      prod.kill('SIGINT');
    }, 3000);
  });
};

module.exports = e2e;

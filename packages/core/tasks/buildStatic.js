/* eslint-disable import/no-unresolved */

const join = require('path').join;
const fs = require('fs');
const puppeteer = require('puppeteer');

const cwd = process.cwd();

const staticPaths = require(join(cwd, 'config.js')).static;
const destination = join(cwd, '/public/pages');

const host = 'http://localhost:3325';

async function renderPage(path) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${host}${path}`);

  const html = await page.evaluate(() => {
    const headScripts = document.head.getElementsByTagName('script');

    for (let i = 0; i < headScripts.length; i += 1) {
      const removedScript = headScripts[i].parentNode.removeChild(headScripts[i]);
      document.body.appendChild(removedScript);
    }

    return document.documentElement.outerHTML;
  });

  await browser.close();

  return { path, html };
}

async function buildStatic() {
  if (staticPaths && staticPaths.length) {
    fs.mkdirSync(destination);

    const renderedPages = await Promise.all(staticPaths.map(await renderPage));

    renderedPages.forEach(({ path, html }) => {
      let name = path.replace('/', '');
      if (!name) { name = 'index'; }

      fs.writeFileSync(join(destination, `/${name}.html`), `<!DOCTYPE html>\n${html}`);
    });
  }
}

module.exports = buildStatic;

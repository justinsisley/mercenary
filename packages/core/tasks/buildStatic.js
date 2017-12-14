/* eslint-disable import/no-unresolved */

const join = require('path').join;
const fs = require('fs');
const puppeteer = require('puppeteer');
const minify = require('html-minifier').minify;

const cwd = process.cwd();

const staticPaths = require(join(cwd, 'config.js')).static;
const destination = join(cwd, '/public/pages');

const host = 'http://localhost:3325';

async function renderPage(path) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${host}${path}`);
  await page.waitForNavigation({ timeout: 0, waitUntil: 'networkidle0' });

  const html = await page.evaluate(() => {
    // We need to move all JavaScript in the head of the document to the body.
    // This prevents errors related to static rendering async routes, which
    // are injected into the head of the document dynamically. When the page
    // is statically rendered, this means the async route is loaded before the
    // main JavaScript bundle.
    const headScripts = Array.prototype.slice.call(
      document.head.getElementsByTagName('script')
    );

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

      // Minify the HTML
      const minified = minify(`<!DOCTYPE html>${html}`, {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
      });

      fs.writeFileSync(join(destination, `/${name}.html`), minified);
    });
  }
}

module.exports = buildStatic;

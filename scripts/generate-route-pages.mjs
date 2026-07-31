import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://promiseibeh-portfolio.pages.dev';
const DIST_DIR = path.resolve('dist');

const sitemap = await readFile(path.join(DIST_DIR, 'sitemap.xml'), 'utf8');
const baseHtml = await readFile(path.join(DIST_DIR, 'index.html'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));

for (const url of urls) {
  const route = url.pathname.replace(/\/+$/, '') || '/';
  if (route === '/') continue;

  const canonical = `${SITE_URL}${route}`;
  const routeHtml = baseHtml
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonical}" />`,
    );

  const outputPath = path.join(DIST_DIR, `${route.slice(1)}.html`);
  await mkdir(path.dirname(outputPath), {recursive: true});
  await writeFile(outputPath, routeHtml, 'utf8');
}

console.log(`Generated ${urls.length - 1} route-specific HTML entries.`);

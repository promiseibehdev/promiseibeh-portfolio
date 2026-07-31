import {readFile} from 'node:fs/promises';

const SITE_URL = 'https://promiseibeh-portfolio.pages.dev';
const HOST = 'promiseibeh-portfolio.pages.dev';
const KEY = '1626bbfe0b874218aebb5265c6864f27';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function verifyKeyFile() {
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    const response = await fetch(KEY_LOCATION, {
      headers: {'cache-control': 'no-cache'},
    });
    const content = response.ok ? (await response.text()).trim() : '';
    if (response.status === 200 && content === KEY) {
      console.log(`Verified IndexNow key file on attempt ${attempt}: ${KEY_LOCATION}`);
      return;
    }
    if (attempt < 12) await delay(5_000);
  }
  throw new Error(`IndexNow key file was not available at ${KEY_LOCATION}`);
}

const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const urlList = [...new Set([`${SITE_URL}/`, ...sitemapUrls])];

if (!urlList.length || urlList.some((url) => new URL(url).host !== HOST)) {
  throw new Error('The sitemap contains an invalid or unexpected host.');
}

await verifyKeyFile();

const response = await fetch(INDEXNOW_ENDPOINT, {
  method: 'POST',
  headers: {'content-type': 'application/json; charset=utf-8'},
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

if (![200, 202].includes(response.status)) {
  const details = await response.text();
  throw new Error(`IndexNow submission failed with HTTP ${response.status}: ${details}`);
}

console.log(`IndexNow accepted ${urlList.length} URLs with HTTP ${response.status}.`);

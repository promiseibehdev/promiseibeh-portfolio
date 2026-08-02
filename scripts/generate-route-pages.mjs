import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://promiseibeh-portfolio.pages.dev';
const DIST_DIR = path.resolve('dist');

const ROUTE_DESCRIPTIONS = {
  '/wordpress-security':
    'A beginner-friendly guide to WordPress security, WooCommerce security, updates, backups, access control, monitoring, and website hardening.',
  '/cybersecurity':
    'Understand cybersecurity, secure coding, privacy, access control, vulnerability awareness, and security reporting through practical portfolio projects.',
  '/cloud-engineering':
    'A clear introduction to cloud engineering, AWS infrastructure, reliability, scalability, monitoring, deployment, and Infrastructure as Code.',
  '/devops':
    'Learn how DevOps connects Git, testing, CI/CD, Docker, Terraform, deployment, monitoring, and release management in practical projects.',
  '/python-automation':
    'Explore Python automation for repetitive work, data processing, validation, reporting, testing, and practical Streamlit applications.',
  '/artificial-intelligence':
    'A beginner-friendly look at artificial intelligence, local AI, privacy, experimentation, and practical content and development workflows.',
  '/projects':
    'Explore Promise Ibeh\'s software, cloud, DevOps, cybersecurity, WordPress, Python automation, and artificial intelligence portfolio projects.',
  '/blog':
    'Read practical articles by Promise Ibeh about WordPress, web security, cloud engineering, artificial intelligence, and modern cryptography.',
  '/blog/wordpress-from-zero-to-hero-a-complete-technical-guide':
    'Learn the infrastructure, performance, and security foundations behind a complete WordPress installation and engineering workflow.',
  '/blog/advanced-web-security-finding-vulnerabilities-like-an-expert':
    'Learn a structured defensive methodology for mapping web architecture, validating inputs, reviewing configuration, and finding vulnerabilities.',
  '/blog/mobile-fortification-how-to-keep-your-mobile-banking-app-secure':
    'Understand mobile banking security through sandbox integrity, device protection, encrypted communication, and safer user practices.',
  '/blog/silent-eyes-how-rogue-attackers-hijack-device-cameras-to-spy-on-you':
    'Learn how camera-hijacking threats abuse permissions, malware, and firmware weaknesses, plus practical steps that reduce surveillance risk.',
  '/blog/agentic-ai-in-the-enterprise-the-shift-from-defensive-automation-to-autonomous-security-battles':
    'Explore how agentic AI changes enterprise cybersecurity through autonomous attacks, defensive workflows, rapid triage, and human oversight.',
  '/blog/post-quantum-cryptography-pqc-preparing-developer-stacks-for-q-day':
    'Learn how crypto-agility and post-quantum cryptography help developers prepare applications and infrastructure for future quantum threats.',
};

const sitemap = await readFile(path.join(DIST_DIR, 'sitemap.xml'), 'utf8');
const baseHtml = await readFile(path.join(DIST_DIR, 'index.html'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));

for (const url of urls) {
  const route = url.pathname.replace(/\/+$/, '') || '/';
  if (route === '/') continue;

  const canonical = `${SITE_URL}${route}`;
  const description = ROUTE_DESCRIPTIONS[route];
  if (!description) {
    throw new Error(`Missing static description for sitemap route: ${route}`);
  }

  const routeHtml = baseHtml
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${description}" />`,
    )
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

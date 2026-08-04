import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://promiseibeh-portfolio.pages.dev';
const DIST_DIR = path.resolve('dist');

const ROUTE_DESCRIPTIONS = {
  '/services':
    'Book professional website development, WordPress, Python automation, cloud, cybersecurity, AI automation, and technology consulting services with Promise Ibeh.',
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

const SERVICES_TITLE = 'Technology Services & Consulting | Promise Ibeh';
const SERVICES_HEADING = 'Practical technology services for your next project';
const SERVICES = [
  ['Website & Technology Consultation', 'https://selar.com/0778q5572c'],
  ['Professional Website Development', 'https://selar.com/80m27m75te'],
  ['WordPress & E-commerce Development', 'https://selar.com/6mq5n9bbb8'],
  ['Python Automation Development', 'https://selar.com/v8m4868t71'],
  ['Cloud & DevOps Solutions', 'https://selar.com/663r1672u8'],
  ['Website Security & Cybersecurity Audit', 'https://selar.com/n2xe141lq2'],
  ['AI Business Automation Solutions', 'https://selar.com/be47w14775'],
];

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

  let routeHtml = baseHtml
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

  if (route === '/services') {
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: SERVICES_TITLE,
          description,
          mainEntity: {
            '@type': 'OfferCatalog',
            name: 'Promise Ibeh Technology Services',
            itemListElement: SERVICES.map(([name, url]) => ({
              '@type': 'Offer',
              url,
              itemOffered: {'@type': 'Service', name},
            })),
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {'@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/`},
            {'@type': 'ListItem', position: 2, name: 'Services', item: canonical},
          ],
        },
      ],
    };
    routeHtml = routeHtml
      .replace(/<title>[^<]*<\/title>/, `<title>${SERVICES_TITLE}</title>`)
      .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${SERVICES_TITLE}" />`)
      .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s, `<meta property="og:description" content="${description}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${SERVICES_TITLE}" />`)
      .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/s, `<meta name="twitter:description" content="${description}" />`)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`)
      .replace('<h1>Promise Ibeh Portfolio</h1>', `<h1>${SERVICES_HEADING}</h1>`);
  }

  const outputPath = path.join(DIST_DIR, `${route.slice(1)}.html`);
  await mkdir(path.dirname(outputPath), {recursive: true});
  await writeFile(outputPath, routeHtml, 'utf8');
}

console.log(`Generated ${urls.length - 1} route-specific HTML entries.`);

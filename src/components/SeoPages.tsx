import {useEffect, type ReactNode} from 'react';
import {ArrowRight, ExternalLink, Github} from 'lucide-react';
import Footer from './Footer';
import {BLOG_POSTS, PERSONAL_INFO, PROJECTS} from '../data';
import {
  EXPERTISE_LINKS,
  type SeoPageDefinition,
  findExpertisePage,
} from '../seoContent';
import type {BlogPost, Project} from '../types';

const SITE_URL = 'https://promiseibeh-portfolio.pages.dev';
const DEFAULT_IMAGE = `${SITE_URL}/images/projects/portfolio-platform.webp.png`;

export const articleSlug = (post: BlogPost) =>
  post.title
    .toLowerCase()
    .replace(/["':?()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const isoDate = (date: string) => {
  const months: Record<string, string> = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };
  const [day, month, year] = date.split(' ');
  return `${year}-${months[month]}-${day.padStart(2, '0')}`;
};

const setMetaContent = (selector: string, attribute: string, value: string) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

const usePageMetadata = ({
  title,
  description,
  path,
  type = 'website',
  image = DEFAULT_IMAGE,
  structuredData,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  structuredData: object[];
}) => {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    document.title = title;
    setMetaContent('meta[name="description"]', 'content', description);
    setMetaContent('link[rel="canonical"]', 'href', canonical);
    setMetaContent('meta[property="og:title"]', 'content', title);
    setMetaContent('meta[property="og:description"]', 'content', description);
    setMetaContent('meta[property="og:image"]', 'content', image);
    setMetaContent('meta[property="og:url"]', 'content', canonical);
    setMetaContent('meta[property="og:type"]', 'content', type);
    setMetaContent('meta[name="twitter:title"]', 'content', title);
    setMetaContent('meta[name="twitter:description"]', 'content', description);
    setMetaContent('meta[name="twitter:image"]', 'content', image);

    const existing = document.getElementById('route-structured-data');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'route-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': structuredData,
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [description, image, path, structuredData, title, type]);
};

const breadcrumbs = (current: string, path: string) => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}${path}#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: current,
      item: `${SITE_URL}${path}`,
    },
  ],
});

function ContentHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-6">
        <a
          href="/"
          className="flex items-center space-x-1 font-display text-2xl font-bold tracking-tight text-gray-900"
        >
          <span>Promise</span>
          <span className="w-2 h-2 rounded-full bg-brand inline-block" />
        </a>
        <nav aria-label="Content navigation" className="flex items-center gap-4 sm:gap-7 text-sm">
          <a className="text-gray-600 hover:text-gray-900" href="/projects">
            Projects
          </a>
          <a className="text-gray-600 hover:text-gray-900" href="/blog">
            Blog
          </a>
          <a className="text-gray-600 hover:text-gray-900" href="/#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function ContentShell({
  current,
  path,
  children,
}: {
  current: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen antialiased">
      <ContentHeader />
      <main id="main-content">
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-10">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a className="hover:text-gray-900" href="/">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a className="text-gray-700" aria-current="page" href={path}>
                  {current}
                </a>
              </li>
            </ol>
          </nav>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function RelatedProjects({ids}: {ids: string[]}) {
  const projects = ids
    .map((id) => PROJECTS.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));
  return (
    <section aria-labelledby="related-projects" className="py-14 border-t border-gray-100">
      <h2 id="related-projects" className="font-display text-3xl font-bold text-gray-900 mb-7">
        Related projects
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article key={project.id} className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
            <h3 className="font-display text-xl font-bold text-gray-900">{project.title}</h3>
            <p className="mt-3 text-gray-600 leading-relaxed line-clamp-4">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
              {project.liveUrl && project.liveStatus !== 'hidden' && (
                <a
                  className="text-brand-dark hover:text-gray-900"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live project
                </a>
              )}
              {project.githubUrl && (
                <a
                  className="text-brand-dark hover:text-gray-900"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedArticles({ids}: {ids: string[]}) {
  const posts = ids
    .map((id) => BLOG_POSTS.find((post) => post.id === id))
    .filter((post): post is BlogPost => Boolean(post));
  if (!posts.length) return null;
  return (
    <section aria-labelledby="related-articles" className="py-14 border-t border-gray-100">
      <h2 id="related-articles" className="font-display text-3xl font-bold text-gray-900 mb-7">
        Related articles
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="rounded-2xl border border-gray-100 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">
              {post.category} · {post.date}
            </p>
            <h3 className="font-display text-xl font-bold text-gray-900 mt-2">{post.title}</h3>
            <p className="text-gray-600 mt-3 line-clamp-3">{post.summary}</p>
            <a
              className="inline-flex items-center gap-1 mt-5 font-semibold text-brand-dark"
              href={`/blog/${articleSlug(post)}`}
            >
              Read article <ArrowRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExploreExpertise() {
  return (
    <section aria-labelledby="explore-expertise" className="py-14 border-t border-gray-100">
      <h2 id="explore-expertise" className="font-display text-3xl font-bold text-gray-900">
        Explore my expertise
      </h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {EXPERTISE_LINKS.map((link) => (
          <a
            key={link.path}
            href={link.path}
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-brand hover:text-gray-900"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}

function ContactCallout() {
  return (
    <section className="rounded-3xl bg-gray-900 text-white p-8 sm:p-12 mb-20">
      <p className="text-brand font-bold uppercase tracking-widest text-xs">Start a conversation</p>
      <h2 className="font-display text-3xl font-bold mt-3">Discuss a project with Promise Ibeh</h2>
      <p className="text-gray-300 mt-4 max-w-2xl leading-relaxed">
        If you need help planning a secure website, cloud demonstration, automation workflow, or
        accessible web application, share the problem and the outcome you need.
      </p>
      <a
        href="/#contact"
        className="inline-flex mt-7 bg-brand text-gray-900 font-bold px-6 py-3 rounded-xl"
      >
        Go to contact details
      </a>
    </section>
  );
}

export function ExpertisePage({page}: {page: SeoPageDefinition}) {
  const canonical = `${SITE_URL}${page.path}`;
  const schema = [
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: {'@id': `${SITE_URL}/#website`},
      about: {'@id': `${SITE_URL}/#person`},
      breadcrumb: {'@id': `${canonical}#breadcrumb`},
    },
    breadcrumbs(page.heading, page.path),
  ];
  usePageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    structuredData: schema,
  });
  return (
    <ContentShell current={page.heading} path={page.path}>
      <article className="max-w-5xl mx-auto px-6 md:px-12 py-14">
        <header className="max-w-4xl">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-dark">
            {page.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mt-3 leading-tight">
            {page.heading}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mt-6">{page.introduction}</p>
        </header>
        <div className="mt-14 space-y-12">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-3xl font-bold text-gray-900">{section.heading}</h2>
              <div className="mt-5 space-y-4 text-gray-600 leading-8">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.points && (
                <ul className="mt-5 space-y-3 list-disc pl-6 text-gray-600">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <RelatedProjects ids={page.relatedProjectIds} />
        <RelatedArticles ids={page.relatedArticleIds} />
        <ExploreExpertise />
        <ContactCallout />
      </article>
    </ContentShell>
  );
}

const projectStatus = (project: Project) => {
  if (project.liveStatus === 'in-development') return 'In development';
  if (project.projectType) return project.projectType;
  if (project.title.includes('Simulator')) return 'Educational simulator';
  return 'Deployed portfolio project';
};

export function ProjectsPage() {
  const path = '/projects';
  const title = 'Software Engineering Projects | Promise Ibeh';
  const description =
    'Explore Promise Ibeh’s cloud, cybersecurity, Python automation, AI, WordPress security, and web engineering projects with live demos and source links.';
  usePageMetadata({
    title,
    description,
    path,
    structuredData: [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}${path}#webpage`,
        url: `${SITE_URL}${path}`,
        name: title,
        description,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: PROJECTS.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: project.title,
          })),
        },
      },
      breadcrumbs('Projects', path),
    ],
  });
  return (
    <ContentShell current="Projects" path={path}>
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-14">
        <header className="max-w-4xl">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-dark">
            Project index
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mt-3">
            Software engineering projects
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mt-6">
            These projects demonstrate cloud infrastructure, secure systems, Python automation,
            local AI experimentation, content workflows, and responsive web engineering. Each
            entry explains what was built and whether it is a deployed application, simulator, or
            work in progress.
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {PROJECTS.map((project) => (
            <article key={project.id} className="rounded-2xl border border-gray-100 overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  {projectStatus(project)}
                </p>
                <h2 className="font-display text-2xl font-bold text-gray-900 mt-2">{project.title}</h2>
                <h3 className="font-bold text-gray-900 mt-5">What it solves and what I built</h3>
                {project.description.split('\n\n').map((paragraph) => (
                  <p key={paragraph} className="text-gray-600 leading-relaxed mt-2">
                    {paragraph}
                  </p>
                ))}
                <h3 className="font-bold text-gray-900 mt-5">Skills demonstrated</h3>
                <p className="text-gray-600 mt-2">{project.technologies.join(', ')}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.liveUrl && project.liveStatus !== 'hidden' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      View live <ExternalLink size={15} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      View source <Github size={15} />
                    </a>
                  )}
                  {!project.liveUrl && !project.githubUrl && (
                    <span className="text-sm text-gray-500">Not publicly available yet.</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <ExploreExpertise />
        <ContactCallout />
      </section>
    </ContentShell>
  );
}

export function BlogIndexPage() {
  const path = '/blog';
  const title = 'Cloud, Cybersecurity & AI Articles | Promise Ibeh';
  const description =
    'Read beginner-friendly articles by Promise Ibeh about WordPress, web security, mobile privacy, artificial intelligence, and cryptography.';
  usePageMetadata({
    title,
    description,
    path,
    structuredData: [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}${path}#blog`,
        url: `${SITE_URL}${path}`,
        name: title,
        description,
        blogPost: BLOG_POSTS.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${SITE_URL}/blog/${articleSlug(post)}`,
          datePublished: isoDate(post.date),
        })),
      },
      breadcrumbs('Blog', path),
    ],
  });
  return (
    <ContentShell current="Blog" path={path}>
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-14">
        <header>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-dark">
            Insights and publications
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mt-3">
            Cloud, cybersecurity, and AI articles
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mt-6 max-w-4xl">
            Explore practical explanations of WordPress engineering, defensive web security,
            mobile privacy, artificial intelligence, and future-ready cryptography.
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="rounded-2xl border border-gray-100 overflow-hidden">
              <img
                src={post.image}
                alt={`${post.title} article illustration`}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  {post.category} · <time dateTime={isoDate(post.date)}>{post.date}</time>
                </p>
                <h2 className="font-display text-2xl font-bold text-gray-900 mt-3">{post.title}</h2>
                <p className="text-gray-600 leading-relaxed mt-4">{post.summary}</p>
                <a
                  href={`/blog/${articleSlug(post)}`}
                  className="inline-flex items-center gap-2 font-bold text-brand-dark mt-6"
                >
                  Read article <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <ExploreExpertise />
        <ContactCallout />
      </section>
    </ContentShell>
  );
}

export function ArticlePage({post}: {post: BlogPost}) {
  const path = `/blog/${articleSlug(post)}`;
  const title = `${post.title} | Promise Ibeh`;
  const description = post.summary;
  const image = `${SITE_URL}${post.image}`;
  usePageMetadata({
    title,
    description,
    path,
    type: 'article',
    image,
    structuredData: [
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}${path}#article`,
        headline: post.title,
        description: post.summary,
        image,
        datePublished: isoDate(post.date),
        articleSection: post.category,
        author: {
          '@type': 'Person',
          name: PERSONAL_INFO.name,
          url: `${SITE_URL}/`,
        },
        mainEntityOfPage: `${SITE_URL}${path}`,
      },
      breadcrumbs(post.title, path),
    ],
  });
  return (
    <ContentShell current={post.title} path={path}>
      <article className="max-w-4xl mx-auto px-6 md:px-12 py-14">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">
            {post.category} · <time dateTime={isoDate(post.date)}>{post.date}</time> · {post.readTime}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mt-6">{post.summary}</p>
          <img
            src={post.image}
            alt={`${post.title} article illustration`}
            className="w-full aspect-[16/9] object-cover rounded-2xl mt-10"
          />
        </header>
        <div
          className="mt-10 space-y-5 text-gray-700 leading-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:pt-6 [&_a]:text-brand-dark [&_a]:underline"
          dangerouslySetInnerHTML={{
            __html: post.content.replaceAll('<h4>', '<h2>').replaceAll('</h4>', '</h2>'),
          }}
        />
        <RelatedArticles ids={BLOG_POSTS.filter((item) => item.id !== post.id).slice(0, 2).map((item) => item.id)} />
        <ExploreExpertise />
        <ContactCallout />
      </article>
    </ContentShell>
  );
}

export function SeoRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const expertisePage = findExpertisePage(path);
  if (expertisePage) return <ExpertisePage page={expertisePage} />;
  if (path === '/projects') return <ProjectsPage />;
  if (path === '/blog') return <BlogIndexPage />;
  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length);
    const post = BLOG_POSTS.find((item) => articleSlug(item) === slug);
    if (post) return <ArticlePage post={post} />;
  }
  return null;
}

export const isSeoPath = (path: string) => {
  const normalized = path.replace(/\/+$/, '') || '/';
  return Boolean(
    findExpertisePage(normalized) ||
      normalized === '/projects' ||
      normalized === '/blog' ||
      (normalized.startsWith('/blog/') &&
        BLOG_POSTS.some((post) => `/blog/${articleSlug(post)}` === normalized)),
  );
};

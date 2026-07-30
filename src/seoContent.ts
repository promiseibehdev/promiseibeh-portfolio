export interface SeoSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface SeoPageDefinition {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  sections: SeoSection[];
  relatedProjectIds: string[];
  relatedArticleIds: string[];
}

export const EXPERTISE_PAGES: SeoPageDefinition[] = [
  {
    path: '/wordpress-security',
    title: 'WordPress Security & Website Hardening | Promise Ibeh',
    description:
      'A beginner-friendly guide to WordPress security, WooCommerce security, updates, backups, access control, monitoring, and website hardening.',
    eyebrow: 'WordPress security',
    heading: 'WordPress security and practical website hardening',
    introduction:
      'WordPress security means reducing the chances that an attacker, unsafe change, or technical failure can damage a website or expose its data. A secure WordPress website is not created by one plugin. It depends on careful updates, controlled access, reliable recovery options, sensible configuration, and ongoing review.',
    sections: [
      {
        heading: 'Why updates, backups, and access control matter',
        paragraphs: [
          'WordPress core, themes, and plugins are software. Like other software, they receive bug fixes and security improvements. Reviewing updates promptly reduces the time that a known weakness remains available to attackers. Updates should still be tested, because compatibility matters as much as speed.',
          'Backups provide a recovery path when an update fails, content is deleted, or a site is compromised. A backup is useful only when it covers the required files and database, is stored safely, and can be restored. Access control adds another layer by giving each person only the permissions needed for their work.',
        ],
        points: [
          'Use unique administrator accounts and strong authentication.',
          'Test backups and record how restoration works.',
          'Remove accounts, themes, and plugins that are no longer needed.',
        ],
      },
      {
        heading: 'Plugin, theme, and login protection',
        paragraphs: [
          'Plugins and themes extend WordPress, but each extension also adds code that must be maintained. A WordPress developer should check whether an extension is supported, updated, necessary, and obtained from a trustworthy source. Abandoned or duplicated extensions increase maintenance work and may increase risk.',
          'Login protection combines strong credentials with controls such as multi-factor authentication, limited login attempts, and careful administrator assignment. Hiding a login page alone is not a complete defense. The aim is to make unauthorized access difficult while keeping legitimate recovery possible.',
        ],
      },
      {
        heading: 'Website hardening, monitoring, and maintenance',
        paragraphs: [
          'Website hardening is the process of applying safer defaults and reducing unnecessary exposure. Examples include appropriate file permissions, protected configuration files, disabled production debugging, security headers, encrypted connections, and restricted editing capabilities. The exact controls depend on the hosting environment and the website’s purpose.',
          'Monitoring helps a site owner notice unexpected file changes, failed logins, outdated components, unavailable pages, and backup problems. Maintenance turns these checks into a repeatable routine instead of a one-time launch task.',
        ],
      },
      {
        heading: 'How the WooCommerce simulator demonstrates the principles',
        paragraphs: [
          'The WooCommerce Storefront & Security Hardening project connects a fictional storefront to an educational security workspace. It presents component versions, findings, control status, prioritized remediation, and a deterministic before-and-after score. This makes security reporting understandable without connecting to a real WordPress installation.',
          'The project is a fictional engineering simulator, not a live commercial shop, vulnerability scanner, or certification. It processes no real payment and performs no live CVE lookup. Its purpose is to demonstrate architecture, WooCommerce security communication, privacy-aware reporting, and a structured hardening workflow.',
        ],
      },
    ],
    relatedProjectIds: ['p4', 'p7'],
    relatedArticleIds: ['b1', 'b2'],
  },
  {
    path: '/cybersecurity',
    title: 'Cybersecurity Projects & Secure Systems | Promise Ibeh',
    description:
      'Understand cybersecurity, secure coding, privacy, access control, vulnerability awareness, and security reporting through practical portfolio projects.',
    eyebrow: 'Cybersecurity',
    heading: 'Cybersecurity projects and secure systems',
    introduction:
      'Cybersecurity is the work of protecting people, information, devices, and services from unauthorized access, disruption, or misuse. Good security is not only a technical checklist. It begins by understanding what matters, what could go wrong, and which practical controls reduce the most important risks.',
    sections: [
      {
        heading: 'Protecting users and business systems',
        paragraphs: [
          'A business system may contain customer information, internal documents, operational workflows, or access to other services. Protecting it requires confidentiality, integrity, and availability: information should be seen by the right people, remain accurate, and be available when needed.',
          'Security decisions should match the system. A public portfolio, an internal content portal, and an ecommerce demonstration have different risks. Clear boundaries, safe defaults, reliable recovery, and understandable error handling help each system fail more safely.',
        ],
      },
      {
        heading: 'Secure coding, access control, and privacy',
        paragraphs: [
          'Secure coding includes validating input, avoiding unsafe deserialization, handling errors without exposing sensitive details, and keeping business rules separate from presentation code. Automated tests help preserve these expectations when software changes.',
          'Access control answers who can perform an action and why. Privacy focuses on collecting and retaining only what is necessary. Several portfolio projects use fictional or reserved data, avoid credentials, and explain persistence limits so visitors are not encouraged to submit real private information.',
        ],
        points: [
          'Validate data at trust boundaries.',
          'Keep secrets out of source code and public reports.',
          'Use least privilege and explicit permissions.',
          'Make security and privacy limitations visible to users.',
        ],
      },
      {
        heading: 'Vulnerability awareness and useful reporting',
        paragraphs: [
          'Vulnerability awareness means recognizing that outdated software, weak configuration, excessive access, and missing recovery plans can create risk. It does not require exaggerating every issue. Findings are more useful when they explain affected components, likely business impact, priority, and a realistic remediation.',
          'The WooCommerce security simulator demonstrates findings and before-and-after reporting with deterministic fictional data. The Enterprise Corporate Portal demonstrates validated persistence, backup and restore, content workflows, and a security review dashboard. Neither project claims to be a live penetration test.',
        ],
      },
      {
        heading: 'A practical learning approach',
        paragraphs: [
          'Beginners can improve security skills by studying one system at a time: map its data, users, dependencies, failure modes, and recovery process. Then test specific controls and document the result. This approach connects cybersecurity concepts to software engineering instead of treating security as a separate final step.',
        ],
      },
    ],
    relatedProjectIds: ['p4', 'p7', 'p6'],
    relatedArticleIds: ['b2', 'b4', 'b3'],
  },
  {
    path: '/cloud-engineering',
    title: 'Cloud Engineering & AWS Projects | Promise Ibeh',
    description:
      'A clear introduction to cloud engineering, AWS infrastructure, reliability, scalability, monitoring, deployment, and Infrastructure as Code.',
    eyebrow: 'Cloud engineering',
    heading: 'Cloud engineering and AWS infrastructure projects',
    introduction:
      'Cloud engineering is the design, deployment, operation, and improvement of computing infrastructure delivered through cloud platforms. It combines networking, compute, storage, security, automation, monitoring, and cost awareness so applications have a dependable place to run.',
    sections: [
      {
        heading: 'Infrastructure, reliability, and availability',
        paragraphs: [
          'Infrastructure includes the networks, machines, storage, identity controls, and supporting services behind an application. Reliability means the system behaves as expected over time. Availability describes whether users can reach the service when they need it.',
          'Cloud engineers reduce single points of failure by distributing important workloads, checking service health, and planning what happens when a component or an entire availability zone fails. Recovery objectives should be explicit rather than assumed.',
        ],
      },
      {
        heading: 'Scalability, deployment, and monitoring',
        paragraphs: [
          'Scalability is the ability to handle changing demand without unnecessary failure or waste. It may involve adding capacity, distributing traffic, or choosing services that scale automatically. A deployment process should be repeatable, observable, and reversible.',
          'Monitoring provides evidence about system health. Metrics, logs, alarms, and clear runbooks help teams respond to high load, unavailable instances, cost changes, and configuration problems. Monitoring is valuable when it leads to a defined action.',
        ],
      },
      {
        heading: 'AWS and Infrastructure as Code',
        paragraphs: [
          'AWS provides services for networking, compute, identity, monitoring, and many other infrastructure needs. Infrastructure as Code tools such as Terraform express desired infrastructure in version-controlled configuration. This supports review, repeatability, and clearer change history.',
          'Infrastructure as Code does not remove the need for design. Network boundaries, identity permissions, state management, recovery, and cost still require deliberate decisions and validation.',
        ],
      },
      {
        heading: 'The high-availability AWS simulator',
        paragraphs: [
          'The High-Availability AWS Infrastructure Simulator visualizes a production-style architecture without creating cloud resources or requiring an AWS account. It demonstrates multi-AZ behavior, traffic-driven scaling, EC2 replacement, availability-zone outage recovery, simulated CloudWatch monitoring, security review, cost awareness, and an educational Terraform explorer.',
          'Because the project is offline and deterministic, visitors can explore failure and recovery concepts safely. It is an educational simulator rather than a claim that live AWS resources are running behind the demonstration.',
        ],
      },
    ],
    relatedProjectIds: ['p6', 'p8'],
    relatedArticleIds: ['b5', 'b6'],
  },
  {
    path: '/devops',
    title: 'DevOps, CI/CD, Docker & Terraform | Promise Ibeh',
    description:
      'Learn how DevOps connects Git, testing, CI/CD, Docker, Terraform, deployment, monitoring, and release management in practical projects.',
    eyebrow: 'DevOps',
    heading: 'DevOps, CI/CD, Docker, and Terraform',
    introduction:
      'DevOps is a way of improving how software is built and operated by bringing development and operational concerns into one continuous workflow. The goal is not to collect tools. It is to make changes smaller, testable, repeatable, observable, and easier to recover.',
    sections: [
      {
        heading: 'Git, GitHub, and collaborative change',
        paragraphs: [
          'Git records source changes and helps developers understand what changed, when, and why. GitHub adds shared repositories, review workflows, issue tracking, and automation. A clear commit history makes releases easier to inspect and problems easier to trace.',
          'Good version-control practice also protects scope. Generated files, secrets, and working data should be excluded, while source, tests, and documentation stay reviewable.',
        ],
      },
      {
        heading: 'Automated testing and CI/CD',
        paragraphs: [
          'Continuous integration runs repeatable checks when code changes. Depending on the project, those checks may include TypeScript validation, Python tests, linting, formatting, startup smoke tests, privacy checks, and production builds.',
          'Continuous delivery or deployment moves a verified revision toward a hosted environment. The portfolio itself uses GitHub Actions to build and deploy to Cloudflare Pages. Streamlit projects use quality workflows and connected deployments, keeping release evidence tied to a commit.',
        ],
      },
      {
        heading: 'Docker, Terraform, and repeatable environments',
        paragraphs: [
          'Docker packages an application and its runtime expectations into a portable container image. Terraform describes infrastructure resources as code. Both tools support consistency, but they solve different problems: Docker packages workloads, while Terraform provisions and connects infrastructure.',
          'Safe automation includes reviewing plans, controlling credentials, managing state carefully, pinning important dependencies, and keeping rollback options. Repeatability should not come at the expense of understanding.',
        ],
      },
      {
        heading: 'Monitoring and release management',
        paragraphs: [
          'A release is complete only when the deployed system is healthy. Monitoring, smoke tests, logs, and link checks provide evidence after deployment. Release notes and version tags explain what visitors can expect from a specific revision.',
          'The WooCommerce simulator, AWS infrastructure simulator, corporate portal, and this portfolio demonstrate combinations of automated testing, GitHub Actions, hosted deployment, release documentation, and post-deployment verification.',
        ],
      },
    ],
    relatedProjectIds: ['p6', 'p4', 'p7', 'p8'],
    relatedArticleIds: ['b5', 'b6'],
  },
  {
    path: '/python-automation',
    title: 'Python Automation Projects | Promise Ibeh',
    description:
      'Explore Python automation for repetitive work, data processing, validation, reporting, testing, and practical Streamlit applications.',
    eyebrow: 'Python automation',
    heading: 'Python automation projects and reliable workflows',
    introduction:
      'Python automation turns a clear, repeatable process into software that can perform the same steps consistently. It is useful for data collection, validation, transformation, reporting, and operational checks. The strongest automation still leaves people with understandable outputs and safe ways to handle exceptions.',
    sections: [
      {
        heading: 'Reducing repetitive work',
        paragraphs: [
          'A good automation project begins by mapping the manual process. Inputs, decisions, expected outputs, failure cases, and ownership should be understood before code is written. Automating an unclear process can make confusion happen faster.',
          'Python is well suited to this work because it has readable syntax and libraries for files, structured data, web requests, tabular processing, testing, and application interfaces.',
        ],
      },
      {
        heading: 'Data processing, validation, and reporting',
        paragraphs: [
          'Automation often receives incomplete or inconsistent information. Validation checks required fields, formats, ranges, and relationships before the data is trusted. Processing then converts accepted inputs into a useful structure, while reporting explains the result and any records that need attention.',
          'Logs and clear error messages help operators understand failures without exposing secrets. Deterministic outputs are especially helpful for tests and repeatable demonstrations.',
        ],
      },
      {
        heading: 'School Check Automation System',
        paragraphs: [
          'The School Check Automation System retrieves and organizes educational records from academic data sources. It demonstrates web-data retrieval, Pandas-based processing, verification, clean formatting, and automated reporting. The project focuses on reducing repeated manual searches while keeping results reviewable.',
          'Its live demonstration and source repository let visitors inspect both the workflow and the engineering approach.',
        ],
      },
      {
        heading: 'Python across the portfolio',
        paragraphs: [
          'Other Python projects use Streamlit for interactive interfaces, typed domain models, validation, JSON serialization, test suites, and deterministic sample data. ThinKaiMotivation Content Studio organizes content workflows offline. The corporate portal demonstrates content management and validated local persistence. The WooCommerce simulator combines commerce services with educational security reporting.',
          'These projects show that automation is not limited to background scripts. Python can also provide safe interfaces that help people review inputs, trigger explicit actions, and understand results.',
        ],
      },
    ],
    relatedProjectIds: ['p1', 'p3', 'p7', 'p4'],
    relatedArticleIds: ['b5'],
  },
  {
    path: '/artificial-intelligence',
    title: 'Artificial Intelligence & Local AI Projects | Promise Ibeh',
    description:
      'A beginner-friendly look at artificial intelligence, local AI, privacy, experimentation, and practical content and development workflows.',
    eyebrow: 'Artificial intelligence',
    heading: 'Artificial intelligence and local AI projects',
    introduction:
      'Artificial intelligence describes computer systems designed to perform tasks that normally involve human-like pattern recognition, language processing, prediction, or decision support. Useful AI projects start with a specific problem, clear boundaries, suitable data, and a way for people to review the output.',
    sections: [
      {
        heading: 'Local AI and private experimentation',
        paragraphs: [
          'Local AI runs a model on hardware controlled by the user instead of sending every prompt to a hosted provider. This can support privacy, offline access, experimentation, and predictable development environments. Local operation does not automatically make a system secure or accurate; model files, permissions, inputs, and outputs still need care.',
          'A sandbox is valuable because it separates experiments from production work. Developers can compare models, test code assistance, observe resource needs, and document limitations before choosing an integration approach.',
        ],
      },
      {
        heading: 'Localized AI Inference Sandbox',
        paragraphs: [
          'The Localized AI Inference Sandbox demonstrates an environment based on tools such as Ollama and LM Studio for running open-source language models locally. It provides a private place to explore code completion, automation utilities, and integration configurations.',
          'The project is an experimentation environment, not a claim that a model is always correct or appropriate for every task. Human review remains important, especially for security-sensitive code or factual output.',
        ],
      },
      {
        heading: 'Content workflows without exaggerated automation',
        paragraphs: [
          'Content work can benefit from structured idea capture, reusable templates, schedules, and clear review stages even when no AI model is used. ThinKaiMotivation Content Studio is an offline-first Streamlit application for organizing motivational content ideas, original quotes, captions, and schedules.',
          'That application deliberately works without AI, API keys, subscriptions, user accounts, or an external database. It demonstrates that a practical workflow should not add intelligent technology unless it improves the actual task.',
        ],
      },
      {
        heading: 'Responsible AI project habits',
        paragraphs: [
          'Responsible experimentation includes protecting private inputs, checking generated output, documenting model and hardware limits, and avoiding unsupported claims. Tests can validate surrounding application behavior, but they do not guarantee that every model response is correct.',
          'The portfolio presents AI as one engineering tool among many. It connects local inference, automation, privacy, and software delivery without presenting experimental systems as autonomous experts.',
        ],
      },
    ],
    relatedProjectIds: ['p2', 'p3'],
    relatedArticleIds: ['b5'],
  },
];

export const EXPERTISE_LINKS = EXPERTISE_PAGES.map(({path, heading}) => ({
  path,
  label: heading
    .replace(' and practical website hardening', '')
    .replace(' projects and secure systems', '')
    .replace(' and AWS infrastructure projects', '')
    .replace(', CI/CD, Docker, and Terraform', '')
    .replace(' projects and reliable workflows', '')
    .replace(' and local AI projects', ''),
}));

export const findExpertisePage = (path: string) =>
  EXPERTISE_PAGES.find((page) => page.path === path);

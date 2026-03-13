import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AIOps Vista',
  tagline: 'DevOps & AIOps Consulting | Cloud Architecture | Intelligent Operations',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://aiopsvista.com',
  baseUrl: '/',

  organizationName: 'kdaiops06',
  projectName: 'AiOpsVista',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/kdaiops06/AiOpsVista/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/kdaiops06/AiOpsVista/tree/main/website/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    metadata: [
      {name: 'keywords', content: 'AIOps, DevOps, consulting, cloud architecture, Kubernetes, observability, AI operations, infrastructure'},
      {name: 'description', content: 'AIOps Vista — Professional DevOps & AIOps consulting services. Cloud architecture, Kubernetes, observability, and intelligent operations.'},
    ],
    navbar: {
      title: 'AIOps Vista',
      logo: {
        alt: 'AIOps Vista',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/services', label: 'Services', position: 'left'},
        {to: '/case-studies', label: 'Case Studies', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/tech-news', label: 'Tech News', position: 'left'},
        {to: '/resources', label: 'Resources', position: 'left'},
        {to: '/about', label: 'About', position: 'right'},
        {to: '/contact', label: 'Contact', position: 'right'},
        {
          href: 'https://github.com/kdaiops06/AiOpsVista',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Consulting',
          items: [
            {label: 'Services', to: '/services'},
            {label: 'Case Studies', to: '/case-studies'},
            {label: 'Book a Consultation', to: '/contact'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Documentation', to: '/docs/'},
            {label: 'Blog', to: '/blog'},
            {label: 'Tech News', to: '/tech-news'},
            {label: 'Templates & Courses', to: '/resources'},
          ],
        },
        {
          title: 'Topics',
          items: [
            {label: 'AIOps', to: '/docs/category/aiops'},
            {label: 'Cloud & DevOps', to: '/docs/category/cloud-devops'},
            {label: 'AI Infrastructure', to: '/docs/category/ai-infrastructure'},
            {label: 'Hands-On Labs', to: '/docs/category/labs'},
          ],
        },
        {
          title: 'Connect',
          items: [
            {label: 'About', to: '/about'},
            {label: 'Contact', to: '/contact'},
            {label: 'Newsletter', to: '/newsletter'},
            {label: 'GitHub', href: 'https://github.com/kdaiops06/AiOpsVista'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AIOps Vista. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

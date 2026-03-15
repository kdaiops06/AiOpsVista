import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AIOps Vista',
  tagline: 'AI Infrastructure Intelligence | DevOps & AIOps Consulting | LLM Security & Observability',
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
      {name: 'keywords', content: 'AIOps, DevOps, AI infrastructure, LLM security, AI observability, consulting, cloud architecture, Kubernetes, LLM operations, RAG systems, AI agents, AI gateway'},
      {name: 'description', content: 'AIOps Vista — AI infrastructure intelligence hub. LLM security, AI observability, production RAG systems, DevOps consulting, and AI tool reviews for enterprise engineering teams.'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'AIOps Vista'},
    ],
    navbar: {
      title: 'AIOps Vista',
      logo: {
        alt: 'AIOps Vista',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/services', label: 'Services', position: 'left'},
        {to: '/ai-tools', label: 'AI Tools', position: 'left'},
        {to: '/comparisons', label: 'Comparisons', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
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
            {label: 'Partner With Us', to: '/partner-with-aiopsvista'},
            {label: 'Book a Consultation', to: '/contact'},
          ],
        },
        {
          title: 'AI Tools',
          items: [
            {label: 'Tool Directory', to: '/ai-tools'},
            {label: 'Tool Reviews', to: '/tools'},
            {label: 'Comparisons', to: '/comparisons'},
            {label: 'AI Tools Docs', to: '/docs/category/ai-tools'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Documentation', to: '/docs/'},
            {label: 'AI Architecture Guides', to: '/docs/category/ai-architecture'},
            {label: 'Blog', to: '/blog'},
            {label: 'Templates & Courses', to: '/resources'},
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

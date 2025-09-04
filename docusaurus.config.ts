import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Helpers4',
  tagline: 'A comprehensive TypeScript utility library with tree-shaking support',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://helpers4.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/doc/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'helpers4', // Usually your GitHub org/user name.
  projectName: 'doc', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          // Please change this to your repo.
          editUrl: 'https://github.com/helpers4/doc/tree/main/',
          versions: {
            current: {
              label: '2.x',
              path: 'current',
            },
          },
          onlyIncludeVersions: ['current'],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/helpers4/doc/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // Replace with your Google Analytics tracking ID
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/helpers4-social-card.jpg',
    navbar: {
      title: 'Helpers4',
      logo: {
        alt: 'Helpers4 Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/playground',
          label: 'Playground',
          position: 'left',
        },
        {
          to: '/comparison',
          label: 'Comparison',
          position: 'left',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/helpers4/helpers4',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'html',
          position: 'right',
          value: '<button class="navbar__item navbar__link toggle-theme" id="theme-toggle" aria-label="Toggle dark mode"><span class="toggle-theme-icon"></span></button>',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'Packages',
          items: [
            {
              label: 'Array Helpers',
              href: 'https://www.npmjs.com/package/@helpers4/array',
            },
            {
              label: 'Function Helpers',
              href: 'https://www.npmjs.com/package/@helpers4/function',
            },
            {
              label: 'All Helpers',
              href: 'https://www.npmjs.com/package/@helpers4/all',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/helpers4/helpers4',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Helpers4. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'javascript', 'json'],
    },
    metadata: [
      { name: 'keywords', content: 'typescript, javascript, utility, library, tree-shaking, helpers' },
      { name: 'author', content: 'Helpers4 Team' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://helpers4.github.io/doc/img/helpers4-social-card.jpg' },
      { property: 'twitter:card', content: 'summary_large_image' },
    ],
  } satisfies Preset.ThemeConfig,

  plugins: [
    // Custom plugin for theme toggle
    function themeTogglePlugin() {
      return {
        name: 'theme-toggle-plugin',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                attributes: {
                  src: '/js/theme-toggle.js',
                },
              },
            ],
          };
        },
      };
    },
  ],
};

export default config;

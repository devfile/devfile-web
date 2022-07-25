import {
  GithubIcon,
  SlackIcon,
  AmazonWebServicesIcon,
  IbmIcon,
  JetBrainsIcon,
  RedHatIcon,
} from '@devfile-web/core';
import type { HeaderNavigation, FooterNavigation, OverallDocsNavigation } from '@devfile-web/core';

export const headerNavigation: HeaderNavigation = [
  { name: 'Registry', href: '/' },
  { name: 'Docs', href: '/docs' },
  { name: 'Get Started', href: '/' },
  { name: 'Github', href: 'https://github.com/orgs/devfile/repositories', image: GithubIcon },
  { name: 'Slack', href: '/', image: SlackIcon },
];

export const footerNavigation: FooterNavigation = {
  contributors: [
    { name: 'Amazon Web Services', href: '#', image: AmazonWebServicesIcon },
    { name: 'IBM', href: '#', image: IbmIcon },
    { name: 'JetBrains', href: '#', image: JetBrainsIcon },
    { name: 'Red Hat', href: '#', image: RedHatIcon },
  ],
  links: [
    { name: 'Cloud Native Computing Foundation', href: '#' },
    { name: 'Registry', href: '#' },
    { name: 'Documentation', href: '#' },
  ],
  social: [
    {
      name: 'Github',
      href: '#',
      image: GithubIcon,
    },
    {
      name: 'Slack',
      href: '#',
      image: SlackIcon,
    },
  ],
};

export const overallDocsNavigation: OverallDocsNavigation = {
  versionNonspecific: [
    {
      title: 'Introduction',
      links: [
        { title: 'Getting started', href: '/docs' },
        { title: 'Installation', href: '/docs/installation' },
      ],
    },
  ],
  versionSpecific: {
    '2.0.0': [
      {
        title: 'Core concepts',
        links: [
          { title: 'Understanding caching', href: '/docs/2.0.0/understanding-caching' },
          {
            title: 'Predicting user behavior',
            href: '/docs/2.0.0/predicting-user-behavior',
          },
          { title: 'Basics of time-travel', href: '/docs/2.0.0/basics-of-time-travel' },
          {
            title: 'Introduction to string theory',
            href: '/docs/2.0.0/introduction-to-string-theory',
          },
          { title: 'The butterfly effect', href: '/docs/2.0.0/the-butterfly-effect' },
        ],
      },
      {
        title: 'Advanced guides',
        links: [
          { title: 'Writing plugins', href: '/docs/2.0.0/writing-plugins' },
          { title: 'Neuralink integration', href: '/docs/2.0.0/neuralink-integration' },
          { title: 'Temporal paradoxes', href: '/docs/2.0.0/temporal-paradoxes' },
          { title: 'Testing', href: '/docs/2.0.0/testing' },
          { title: 'Compile-time caching', href: '/docs/2.0.0/compile-time-caching' },
          {
            title: 'Predictive data generation',
            href: '/docs/2.0.0/predictive-data-generation',
          },
        ],
      },
      {
        title: 'API reference',
        links: [
          { title: 'CacheAdvance.predict()', href: '/docs/2.0.0/cacheadvance-predict' },
          { title: 'CacheAdvance.flush()', href: '/docs/2.0.0/cacheadvance-flush' },
          { title: 'CacheAdvance.revert()', href: '/docs/2.0.0/cacheadvance-revert' },
          { title: 'CacheAdvance.regret()', href: '/docs/2.0.0/cacheadvance-regret' },
        ],
      },
      {
        title: 'Contributing',
        links: [
          { title: 'How to contribute', href: '/docs/2.0.0/how-to-contribute' },
          { title: 'Architecture guide', href: '/docs/2.0.0/architecture-guide' },
          { title: 'Design principles', href: '/docs/2.0.0/design-principles' },
        ],
      },
    ],
    '2.1.0': [
      {
        title: 'Unorganized',
        links: [
          {
            title: 'Adding a command group',
            href: '/docs/2.1.0/adding-a-command-group',
          },
          {
            title: 'Adding a command section',
            href: '/docs/2.1.0/adding-a-command-section',
          },
          {
            title: 'Adding a container component',
            href: '/docs/2.1.0/adding-a-container-component',
          },

          {
            title: 'Adding a kubernetes or openshift component',
            href: '/docs/2.1.0/adding-a-kubernetes-or-openshift-component',
          },
          { title: 'Adding a name', href: '/docs/2.1.0/adding-a-name' },

          { title: 'Adding a registry schema', href: '/docs/2.1.0/adding-a-registry-schema' },
          { title: 'Adding a stack yaml file', href: '/docs/2.1.0/adding-a-stack-yaml-file' },
          {
            title: 'Adding a volume component',
            href: '/docs/2.1.0/adding-a-volume-component',
          },
          {
            title: 'Adding an image component',
            href: '/docs/2.1.0/adding-an-image-component',
          },
          {
            title: 'Adding apply commands',
            href: '/docs/2.1.0/adding-apply-commands',
          },
          {
            title: 'Adding attributes',
            href: '/docs/2.1.0/adding-attributes',
          },
          {
            title: 'Adding commands',
            href: '/docs/2.1.0/adding-commands',
          },
          {
            title: 'Adding components',
            href: '/docs/2.1.0/adding-components',
          },
          {
            title: 'Adding composite commands',
            href: '/docs/2.1.0/adding-composite-commands',
          },
          { title: 'Adding event bindings', href: '/docs/2.1.0/adding-event-bindings' },
          {
            title: 'Adding exec commands',
            href: '/docs/2.1.0/adding-exec-commands',
          },
          {
            title: 'Adding projects',
            href: '/docs/2.1.0/adding-projects',
          },
          {
            title: 'Adding schema version',
            href: '/docs/2.1.0/adding-schema-version',
          },
          { title: 'Authoring devfiles', href: '/docs/2.1.0/authoring-devfiles' },
          {
            title: 'Building a custom devfile registry',
            href: '/docs/2.1.0/building-a-custom-devfile-registry',
          },
          { title: 'Creating a devfile stack', href: '/docs/2.1.0/creating-a-devfile-stack' },
          { title: 'Defining endpoints', href: '/docs/2.1.0/defining-endpoints' },
          {
            title: 'Defining environment variables',
            href: '/docs/2.1.0/defining-environment-variables',
          },
          {
            title: 'Defining kubernetes resources',
            href: '/docs/2.1.0/defining-kubernetes-resources',
          },
          {
            title: 'Deploying a devfile registry',
            href: '/docs/2.1.0/deploying-a-devfile-registry',
          },
          { title: 'Developing with devfiles', href: '/docs/2.1.0/developing-with-devfiles' },
          { title: 'Devfile commands', href: '/docs/2.1.0/devfile-commands' },
          { title: 'Devfile library', href: '/docs/2.1.0/devfile-library' },
          { title: 'Devfile registry', href: '/docs/2.1.0/devfile-registry' },
          { title: 'Devfile resources', href: '/docs/2.1.0/devfile-resources' },
          { title: 'Getting started', href: '/docs/2.1.0' },
          {
            title: 'Installation of incluster offline devfile registry',
            href: '/docs/2.1.0/installation-of-incluster-offline-devfile-registry',
          },
          { title: 'Limiting resources usage', href: '/docs/2.1.0/limiting-resources-usage' },
          { title: 'Migrating commands', href: '/docs/2.1.0/migrating-commands' },
          { title: 'Migrating components', href: '/docs/2.1.0/migrating-components' },
          { title: 'Migrating plug ins', href: '/docs/2.1.0/migrating-plug-ins' },
          { title: 'Migrating projects', href: '/docs/2.1.0/migrating-projects' },
          { title: 'Migrating schema version', href: '/docs/2.1.0/migrating-schema-version' },
          { title: 'Migrating to devfile v2', href: '/docs/2.1.0/migrating-to-devfile-v2' },
          {
            title: 'Referring to a parent devfile in a devfile',
            href: '/docs/2.1.0/referring-to-a-parent-devfile-in-a-devfile',
          },
          {
            title: 'Specifying persistent storage',
            href: '/docs/2.1.0/specifying-persistent-storage',
          },
          { title: 'Troubleshooting', href: '/docs/2.1.0/troubleshooting' },
          {
            title: 'Understanding a devfile registry',
            href: '/docs/2.1.0/understanding-a-devfile-registry',
          },
          { title: 'Using devfiles', href: '/docs/2.1.0/using-devfiles' },
          { title: 'Using the devfile library', href: '/docs/2.1.0/using-the-devfile-library' },
        ],
      },
      {
        title: 'API reference',
        links: [{ title: 'Devfile', href: '/docs/2.1.0/api-reference' }],
      },
    ],
    '2.2.0-alpha': [
      {
        title: 'Core concepts',
        links: [
          { title: 'Understanding caching', href: '/docs/2.2.0-alpha/understanding-caching' },
          {
            title: 'Predicting user behavior',
            href: '/docs/2.2.0-alpha/predicting-user-behavior',
          },
          { title: 'Basics of time-travel', href: '/docs/2.2.0-alpha/basics-of-time-travel' },
          {
            title: 'Introduction to string theory',
            href: '/docs/2.2.0-alpha/introduction-to-string-theory',
          },
          { title: 'The butterfly effect', href: '/docs/2.2.0-alpha/the-butterfly-effect' },
        ],
      },
      {
        title: 'Advanced guides',
        links: [
          { title: 'Writing plugins', href: '/docs/2.2.0-alpha/writing-plugins' },
          { title: 'Neuralink integration', href: '/docs/2.2.0-alpha/neuralink-integration' },
          { title: 'Temporal paradoxes', href: '/docs/2.2.0-alpha/temporal-paradoxes' },
          { title: 'Testing', href: '/docs/2.2.0-alpha/testing' },
          { title: 'Compile-time caching', href: '/docs/2.2.0-alpha/compile-time-caching' },
          {
            title: 'Predictive data generation',
            href: '/docs/2.2.0-alpha/predictive-data-generation',
          },
        ],
      },
      {
        title: 'API reference',
        links: [
          { title: 'CacheAdvance.predict()', href: '/docs/2.2.0-alpha/cacheadvance-predict' },
          { title: 'CacheAdvance.flush()', href: '/docs/2.2.0-alpha/cacheadvance-flush' },
          { title: 'CacheAdvance.revert()', href: '/docs/2.2.0-alpha/cacheadvance-revert' },
          { title: 'CacheAdvance.regret()', href: '/docs/2.2.0-alpha/cacheadvance-regret' },
        ],
      },
      {
        title: 'Contributing',
        links: [
          { title: 'How to contribute', href: '/docs/2.2.0-alpha/how-to-contribute' },
          { title: 'Architecture guide', href: '/docs/2.2.0-alpha/architecture-guide' },
          { title: 'Design principles', href: '/docs/2.2.0-alpha/design-principles' },
        ],
      },
    ],
  },
  defaultVersion: '2.1.0',
};

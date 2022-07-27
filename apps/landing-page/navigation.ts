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
        title: 'Core concepts',
        links: [
          { title: 'Understanding caching', href: '/docs/2.1.0/understanding-caching' },
          {
            title: 'Predicting user behavior',
            href: '/docs/2.1.0/predicting-user-behavior',
          },
          { title: 'Basics of time-travel', href: '/docs/2.1.0/basics-of-time-travel' },
          {
            title: 'Introduction to string theory',
            href: '/docs/2.1.0/introduction-to-string-theory',
          },
          { title: 'The butterfly effect', href: '/docs/2.1.0/the-butterfly-effect' },
        ],
      },
      {
        title: 'Advanced guides',
        links: [
          { title: 'Writing plugins', href: '/docs/2.1.0/writing-plugins' },
          { title: 'Neuralink integration', href: '/docs/2.1.0/neuralink-integration' },
          { title: 'Temporal paradoxes', href: '/docs/2.1.0/temporal-paradoxes' },
          { title: 'Testing', href: '/docs/2.1.0/testing' },
          { title: 'Compile-time caching', href: '/docs/2.1.0/compile-time-caching' },
          {
            title: 'Predictive data generation',
            href: '/docs/2.1.0/predictive-data-generation',
          },
        ],
      },
      {
        title: 'API reference',
        links: [
          { title: 'CacheAdvance.predict()', href: '/docs/2.1.0/cacheadvance-predict' },
          { title: 'CacheAdvance.flush()', href: '/docs/2.1.0/cacheadvance-flush' },
          { title: 'CacheAdvance.revert()', href: '/docs/2.1.0/cacheadvance-revert' },
          { title: 'CacheAdvance.regret()', href: '/docs/2.1.0/cacheadvance-regret' },
        ],
      },
      {
        title: 'Contributing',
        links: [
          { title: 'How to contribute', href: '/docs/2.1.0/how-to-contribute' },
          { title: 'Architecture guide', href: '/docs/2.1.0/architecture-guide' },
          { title: 'Design principles', href: '/docs/2.1.0/design-principles' },
        ],
      },
    ],
    '2.2.0-alpha': [
      {
        title: 'Quick start',
        links: [
          { title: 'Quick start', href: '/docs/2.2.0-alpha' },
          { title: 'Overview', href: '/docs/2.2.0-alpha/authoring-devfiles' },
          {
            title: 'Versions',
            href: '/docs/2.2.0-alpha/adding-schema-version',
          },
          { title: 'Metadata', href: '/docs/2.2.0-alpha/adding-a-name' },
          {
            title: 'Library',
            href: '/docs/2.2.0-alpha/using-the-devfile-library',
          },
          { title: 'Resources', href: '/docs/2.2.0-alpha/devfile-resources' },
        ],
      },
      {
        title: 'Components',
        links: [
          {
            title: 'Adding components',
            href: '/docs/2.2.0-alpha/adding-components',
          },
          {
            title: 'Adding a kubernetes or openshift component',
            href: '/docs/2.2.0-alpha/adding-a-kubernetes-or-openshift-component',
          },
          {
            title: 'Adding a container component',
            href: '/docs/2.2.0-alpha/adding-a-container-component',
          },
          {
            title: 'Adding an image component',
            href: '/docs/2.2.0-alpha/adding-an-image-component',
          },
          {
            title: 'Adding a volume component',
            href: '/docs/2.2.0-alpha/adding-a-volume-component',
          },
          {
            title: 'Specifying persistent storage',
            href: '/docs/2.2.0-alpha/specifying-persistent-storage',
          },
          { title: 'Limiting resources usage', href: '/docs/2.2.0-alpha/limiting-resources-usage' },
          {
            title: 'Defining environment variables',
            href: '/docs/2.2.0-alpha/defining-environment-variables',
          },
          { title: 'Defining endpoints', href: '/docs/2.2.0-alpha/defining-endpoints' },
          {
            title: 'Defining kubernetes resources',
            href: '/docs/2.2.0-alpha/defining-kubernetes-resources',
          },
        ],
      },
      {
        title: 'Commands',
        links: [
          {
            title: 'Adding commands',
            href: '/docs/2.2.0-alpha/adding-commands',
          },
          { title: 'Commands', href: '/docs/2.2.0-alpha/devfile-commands' },
          {
            title: 'Adding a command section',
            href: '/docs/2.2.0-alpha/adding-a-command-section',
          },
          {
            title: 'Adding a command group',
            href: '/docs/2.2.0-alpha/adding-a-command-group',
          },
          {
            title: 'Adding exec commands',
            href: '/docs/2.2.0-alpha/adding-exec-commands',
          },
          {
            title: 'Adding apply commands',
            href: '/docs/2.2.0-alpha/adding-apply-commands',
          },
          {
            title: 'Adding composite commands',
            href: '/docs/2.2.0-alpha/adding-composite-commands',
          },
        ],
      },
      {
        title: 'Events',
        links: [
          { title: 'Adding event bindings', href: '/docs/2.2.0-alpha/adding-event-bindings' },
        ],
      },
      {
        title: 'General',
        links: [
          {
            title: 'Adding attributes',
            href: '/docs/2.2.0-alpha/adding-attributes',
          },
          {
            title: 'Adding projects',
            href: '/docs/2.2.0-alpha/adding-projects',
          },
          {
            title: 'Referring to a parent devfile',
            href: '/docs/2.2.0-alpha/referring-to-a-parent-devfile',
          },
        ],
      },
      {
        title: 'API reference',
        links: [{ title: 'Devfile schema', href: '/docs/2.2.0-alpha/devfile-schema' }],
      },
      {
        title: 'Registry',
        links: [
          { title: 'Devfile Registry', href: '/docs/2.2.0-alpha/devfile-registry' },
          {
            title: 'Understanding a devfile registry',
            href: '/docs/2.2.0-alpha/understanding-a-devfile-registry',
          },
          {
            title: 'Building a custom devfile registry',
            href: '/docs/2.2.0-alpha/building-a-custom-devfile-registry',
          },
          {
            title: 'Installation of in-cluster offline devfile registry',
            href: '/docs/2.2.0-alpha/installation-of-in-cluster-offline-devfile-registry',
          },
          {
            title: 'Deploying a devfile registry',
            href: '/docs/2.2.0-alpha/deploying-a-devfile-registry',
          },
          { title: 'Adding a registry schema', href: '/docs/2.2.0-alpha/adding-a-registry-schema' },
          { title: 'Creating a devfile stack', href: '/docs/2.2.0-alpha/creating-a-devfile-stack' },
          { title: 'Adding a stack yaml file', href: '/docs/2.2.0-alpha/adding-a-stack-yaml-file' },
        ],
      },
      {
        title: 'Migrating',
        links: [
          { title: 'Migrating to devfile v2', href: '/docs/2.2.0-alpha/migrating-to-devfile-v2' },
          { title: 'Migrating schema version', href: '/docs/2.2.0-alpha/migrating-schema-version' },
          { title: 'Migrating projects', href: '/docs/2.2.0-alpha/migrating-projects' },
          { title: 'Migrating components', href: '/docs/2.2.0-alpha/migrating-components' },
          { title: 'Migrating plug ins', href: '/docs/2.2.0-alpha/migrating-plug-ins' },
          { title: 'Migrating commands', href: '/docs/2.2.0-alpha/migrating-commands' },
          { title: 'Troubleshooting', href: '/docs/2.2.0-alpha/troubleshooting' },
        ],
      },
      {
        title: 'Unorganized',
        links: [
          { title: 'Devfile library', href: '/docs/2.2.0-alpha/devfile-library' },
          { title: 'Developing with devfiles', href: '/docs/2.2.0-alpha/developing-with-devfiles' },
          { title: 'Using devfiles', href: '/docs/2.2.0-alpha/using-devfiles' },
        ],
      },
    ],
  },
  defaultVersion: '2.2.0-alpha',
};

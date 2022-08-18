import {
  GithubIcon,
  SlackIcon,
  AmazonWebServicesIcon,
  IbmIcon,
  JetBrainsIcon,
  RedHatIcon,
} from '@devfile-web/core';
import { defaultVersion } from '@devfile-web/docs';
import { ViewGridIcon, BookOpenIcon, ViewListIcon } from '@heroicons/react/outline';
import type { HeaderNavigation, FooterNavigation, NavigationElement } from '@devfile-web/core';

export { docsNavigation } from '@devfile-web/docs';

export const headerNavigation: HeaderNavigation = [
  { name: 'Registry', href: 'https://registry.devfile.io' },
  { name: 'Docs', href: `/docs/${defaultVersion}/what-is-a-devfile` },
  { name: 'Get Started', href: `/docs/${defaultVersion}/devfile-ecosystem` },
  { name: 'Github', href: 'https://github.com/devfile/api', image: GithubIcon },
  { name: 'Slack', href: 'https://kubernetes.slack.com/archives/C02SX9E5B55', image: SlackIcon },
];

export const footerNavigation: FooterNavigation = {
  contributors: [
    { name: 'Amazon Web Services', href: 'https://aws.amazon.com', image: AmazonWebServicesIcon },
    { name: 'IBM', href: 'https://www.ibm.com', image: IbmIcon },
    { name: 'JetBrains', href: 'https://www.jetbrains.com', image: JetBrainsIcon },
    { name: 'Red Hat', href: 'https://www.redhat.com', image: RedHatIcon },
  ],
  links: [
    { name: 'Cloud Native Computing Foundation', href: 'https://www.cncf.io' },
    { name: 'Registry', href: 'https://registry.devfile.io' },
    { name: 'Documentation', href: `/docs/${defaultVersion}/what-is-a-devfile` },
  ],
  social: [
    {
      name: 'Github',
      href: 'https://github.com/devfile/api',
      image: GithubIcon,
    },
    {
      name: 'Slack',
      href: 'https://kubernetes.slack.com/archives/C02SX9E5B55',
      image: SlackIcon,
    },
  ],
};

export interface Custom404NavigationElement extends NavigationElement {
  description: string;
}

export type Custom404Navigation = Custom404NavigationElement[];

export const custom404Navigation: Custom404Navigation = [
  {
    name: 'Documentation',
    description: 'Learn how to integrate devfile with your app',
    image: BookOpenIcon,
    href: `/docs/${defaultVersion}/what-is-a-devfile`,
  },
  {
    name: 'API Reference',
    description: 'A complete API reference for devfile',
    image: ViewListIcon,
    href: `/docs/${defaultVersion}/devfile-schema`,
  },
  {
    name: 'Registry',
    description: 'Browse devfile stacks and samples',
    image: ViewGridIcon,
    href: 'https://registry.devfile.io',
  },
];

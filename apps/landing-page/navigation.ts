import {
  GithubIcon,
  SlackIcon,
  AmazonWebServicesIcon,
  IbmIcon,
  JetBrainsIcon,
  RedHatIcon,
} from '@devfile-web/core';
import type { HeaderNavigation, FooterNavigation } from '@devfile-web/core';

export { docsNavigation } from '@devfile-web/docs';

export const headerNavigation: HeaderNavigation = [
  { name: 'Registry', href: '/' },
  { name: 'Docs', href: '/docs/what-is-a-devfile' },
  { name: 'Get Started', href: '/' },
  { name: 'Github', href: 'https://github.com/orgs/devfile/repositories', image: GithubIcon },
  { name: 'Slack', href: '/', image: SlackIcon },
];

export const footerNavigation: FooterNavigation = {
  contributors: [
    { name: 'Amazon Web Services', href: '/', image: AmazonWebServicesIcon },
    { name: 'IBM', href: '/', image: IbmIcon },
    { name: 'JetBrains', href: '/', image: JetBrainsIcon },
    { name: 'Red Hat', href: '/', image: RedHatIcon },
  ],
  links: [
    { name: 'Cloud Native Computing Foundation', href: '/' },
    { name: 'Registry', href: '/' },
    { name: 'Documentation', href: '/' },
  ],
  social: [
    {
      name: 'Github',
      href: 'https://github.com/orgs/devfile/repositories',
      image: GithubIcon,
    },
    {
      name: 'Slack',
      href: '/',
      image: SlackIcon,
    },
  ],
};

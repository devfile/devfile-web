import {
  GithubIcon,
  SlackIcon,
  AmazonWebServicesIcon,
  IbmIcon,
  JetBrainsIcon,
  RedHatIcon,
} from '@devfile-web/core';
import { defaultVersion } from '@devfile-web/docs';
import type { HeaderNavigation, FooterNavigation } from '@devfile-web/core';

export { docsNavigation } from '@devfile-web/docs';

export const headerNavigation: HeaderNavigation = [
  { name: 'Registry', href: 'https://registry.devfile.io' },
  { name: 'Docs', href: `/docs/${defaultVersion}/overview` },
  { name: 'Get Started', href: `/docs/${defaultVersion}/what-is-a-devfile` },
  { name: 'Github', href: 'https://github.com/orgs/devfile/repositories', image: GithubIcon },
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
    { name: 'Documentation', href: `/docs/${defaultVersion}/overview` },
  ],
  social: [
    {
      name: 'Github',
      href: 'https://github.com/orgs/devfile/repositories',
      image: GithubIcon,
    },
    {
      name: 'Slack',
      href: 'https://kubernetes.slack.com/archives/C02SX9E5B55',
      image: SlackIcon,
    },
  ],
};

/**
 * Copyright Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  GithubIcon,
  SlackIcon,
  AmazonWebServicesIcon,
  IbmIcon,
  JetBrainsIcon,
  RedHatIcon,
} from '@devfile-web/core';
import { defaultVersion } from '@devfile-web/docs';
import { Squares2X2Icon, BookOpenIcon, Bars4Icon } from '@heroicons/react/24/outline';
import type { HeaderNavigation, FooterNavigation, Custom404Navigation } from '@devfile-web/core';

export const headerNavigation: HeaderNavigation = [
  { name: 'Registry', href: '/' },
  { name: 'Docs', href: `https://devfile.io/docs/${defaultVersion}/what-is-a-devfile` },
  { name: 'Get Started', href: `https://devfile.io/docs/${defaultVersion}/devfile-ecosystem` },
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
    { name: 'Registry', href: '/' },
    { name: 'Documentation', href: `https://devfile.io/docs/${defaultVersion}/what-is-a-devfile` },
    { name: 'Community', href: `https://devfile.io/docs/${defaultVersion}/community` },
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

export const custom404Navigation: Custom404Navigation = [
  {
    name: 'Registry',
    description: 'Browse devfile stacks and samples',
    image: Squares2X2Icon as any,
    href: '/',
  },
  {
    name: 'Documentation',
    description: 'Learn how to integrate devfile with your app',
    image: BookOpenIcon as any,
    href: `https://devfile.io/docs/${defaultVersion}/what-is-a-devfile`,
  },
  {
    name: 'API Reference',
    description: 'A complete API reference for devfile',
    image: Bars4Icon as any,
    href: `https://devfile.io/docs/${defaultVersion}/devfile-schema`,
  },
];

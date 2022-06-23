import React from 'react';
import {
  DevfileLogoGrayscaleIcon,
  GithubIcon,
  SlackIcon,
  AmazonWebServicesIcon,
  IbmIcon,
  JetBrainsIcon,
  RedHatIcon,
} from '../../images';

const navigation = {
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

export function Footer(): JSX.Element {
  return (
    <footer className="bg-slate-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <DevfileLogoGrayscaleIcon className="h-10" />
            <p className="text-base text-gray-500">
              An open standard defining containerized development environments.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.image className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Contributors
              </h3>
              <ul className="mt-4 space-y-4">
                {navigation.contributors.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-base text-gray-500  hover:text-gray-900">
                      <item.image className="inline h-6 w-6" aria-hidden="true" /> {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Links
              </h3>
              <ul className="mt-4 space-y-4">
                {navigation.links.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

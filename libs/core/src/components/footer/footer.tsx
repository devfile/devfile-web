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

import Link from 'next/link';
import { DevfileIcon } from '../../icons';
import { useLinks } from '../../hooks';

export interface FooterProps {
  websiteName: string;
  websiteDescription?: string;
}

export function Footer(props: FooterProps): JSX.Element {
  const { websiteName, websiteDescription } = props;

  const { footerNavigation } = useLinks();

  return (
    <footer
      className="border-t bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-screen-2xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" aria-label="Home page" passHref className="flex items-center gap-4">
              <DevfileIcon className="fill-devfile h-9 w-auto" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-sky-100">
                {websiteName}
              </h3>
            </Link>
            {websiteDescription && (
              <p className="text-base text-slate-500 dark:text-slate-400">{websiteDescription}</p>
            )}
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <span className="sr-only">{item.name}</span>
                  {item.image && (
                    <item.image
                      className="h-6 w-auto fill-slate-500 hover:fill-slate-600 dark:fill-slate-400 dark:hover:fill-slate-300"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-sky-100">
                Contributors
              </h3>
              <ul className="mt-4 space-y-4">
                {footerNavigation.contributors.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group text-base text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                      passHref
                    >
                      {item.image && (
                        <item.image
                          className="inline h-auto w-6 fill-slate-500 group-hover:fill-slate-600 dark:fill-slate-400 dark:group-hover:fill-slate-300"
                          aria-hidden="true"
                        />
                      )}{' '}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-sky-100">
                Links
              </h3>
              <ul className="mt-4 space-y-4">
                {footerNavigation.links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-base text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      {item.name}
                    </Link>
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

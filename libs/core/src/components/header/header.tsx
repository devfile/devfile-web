/**
 * Copyright 2023 Red Hat, Inc.
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
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';
import { DevfileIcon } from '../../icons';
import { LandingPageSearch } from '../landing-page-search/landing-page-search';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { VersionSelector } from '../version-selector/version-selector';
import { HeaderBreadcrumbs } from './header-breadcrumbs';
import { useLinks } from '../../hooks';

export interface HeaderProps {
  websiteName: string;
  isLandingPage?: boolean;
}

export function Header(props: HeaderProps): JSX.Element {
  const { websiteName, isLandingPage } = props;

  const { headerNavigation } = useLinks();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    function onScroll(): void {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={clsx(
        'sticky top-0 z-50 flex flex-col justify-center border-b border-slate-200 bg-white px-4 py-2 shadow-md shadow-slate-900/5 transition duration-500 dark:border-slate-800 sm:px-6 lg:flex-row lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent',
      )}
    >
      <div className="flex max-w-screen-2xl grow flex-wrap items-center justify-between">
        <div className="my-2 flex items-center">
          <Link href="/" aria-label="Home page" passHref className="flex items-center pr-4">
            <DevfileIcon className="fill-devfile h-9 w-auto pr-2" />
            <h3 className="hidden pr-2 text-xl font-semibold text-slate-700 dark:text-sky-100 sm:block">
              {websiteName}
            </h3>
          </Link>
          {isLandingPage && <VersionSelector className="relative z-10" />}
        </div>

        <div className="my-2 flex grow items-center justify-end gap-4 lg:hidden">
          {isLandingPage && <LandingPageSearch />}
          <Popover className="relative flex items-center">
            <Popover.Button>
              <EllipsisVerticalIcon
                className="h-6 w-auto stroke-slate-400 hover:fill-slate-500 dark:stroke-slate-500 dark:hover:stroke-slate-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Popover.Panel className="absolute right-0 top-full z-50 mt-4 w-screen max-w-[250px] rounded-lg border border-slate-700 bg-white p-6 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
              <div className="flex flex-col gap-4">
                {headerNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-label={item.name}
                    className="whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
                <span className="whitespace-nowrap text-base text-slate-500 dark:text-slate-400">
                  Switch theme
                </span>
                <ThemeSelector className="relative z-10" isRightAligned />
              </div>
            </Popover.Panel>
          </Popover>
        </div>
        <div className="my-2 hidden grow items-center justify-end gap-8 lg:flex">
          <ThemeSelector className="relative z-10" />
          {headerNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className="whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
            >
              {item.image ? (
                <item.image className="h-6 w-auto fill-slate-500 hover:fill-slate-800 dark:fill-slate-400 dark:hover:fill-slate-300" />
              ) : (
                item.name
              )}
            </Link>
          ))}
        </div>
      </div>
      {isLandingPage && <HeaderBreadcrumbs />}
    </div>
  );
}

export default Header;

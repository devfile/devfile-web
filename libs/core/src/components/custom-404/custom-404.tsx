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

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Custom404Navigation } from '../../types';
import { DevfileIcon } from '../../icons';

export interface Custom404Props {
  custom404Navigation: Custom404Navigation;
}

export function Custom404(props: Custom404Props): JSX.Element {
  const { custom404Navigation } = props;

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex-shrink-0 pt-16">
        <DevfileIcon className="fill-devfile mx-auto h-12 w-auto" />
      </div>
      <div className="mx-auto max-w-xl py-16 sm:py-24">
        <div className="text-center">
          <p className="text-devfile text-base font-semibold">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-700 dark:text-sky-100 sm:text-5xl sm:tracking-tight">
            This page does not exist.
          </h1>
          <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
            The page you are looking for could not be found.
          </p>
        </div>
        <div className="mt-12">
          <h2 className="text-base font-semibold text-slate-500 dark:text-slate-400">
            Popular pages
          </h2>
          <ul className="mt-4 divide-y divide-slate-200 border-t border-b border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {custom404Navigation.map((link) => (
              <li key={link.name} className="group py-6">
                <Link href={link.href} passHref className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <span className="bg-devfile flex h-12 w-12 items-center justify-center rounded-lg">
                      <link.image className="h-6 w-auto text-sky-100" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium text-slate-700 group-hover:text-slate-800 dark:text-sky-100 dark:group-hover:text-sky-50">
                      {link.name}
                    </h3>
                    <p className="text-base text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">
                      {link.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <ChevronRightIcon
                      className="h-5 w-5 text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/"
              className="text-base font-medium text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              passHref
            >
              Or go back home<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Custom404;

/**
 * Copyright 2022 Red Hat, Inc.
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

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import clsx from 'clsx';
import { useSearchDevfiles } from '../../hooks';
import { createDevfileLink } from '../../functions';

export function Pagination(): JSX.Element | null {
  const { devfiles, page, dispatch, query } = useSearchDevfiles();

  const prevPage = page.number > 1 ? page.number - 1 : 1;
  const nextPage = page.number < page.total ? page.number + 1 : page.total;

  if (page.total <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-6 dark:border-slate-800 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          scroll={false}
          shallow
          href={createDevfileLink({ ...page, number: prevPage }, query)}
          onClick={(): void => {
            dispatch({
              type: 'SET_PAGE_NUMBER',
              payload: prevPage,
            });
          }}
          className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-100"
        >
          Previous
        </Link>
        <Link
          scroll={false}
          shallow
          href={createDevfileLink({ ...page, number: nextPage }, query)}
          onClick={(): void => {
            dispatch({
              type: 'SET_PAGE_NUMBER',
              payload: nextPage,
            });
          }}
          className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-100"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-medium">{(page.number - 1) * devfiles.limit + 1}</span> to{' '}
            <span className="font-medium">
              {page.number * devfiles.limit < devfiles.searched.length
                ? page.number * devfiles.limit
                : devfiles.searched.length}
            </span>{' '}
            of <span className="font-medium">{devfiles.searched.length}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              scroll={false}
              shallow
              href={createDevfileLink({ ...page, number: prevPage }, query)}
              onClick={(): void => {
                dispatch({
                  type: 'SET_PAGE_NUMBER',
                  payload: prevPage,
                });
              }}
              className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center rounded-l-md border border-slate-300 bg-white px-2 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {/* eslint-disable-next-line unicorn/new-for-builtins */}
            {[...Array(page.total).keys()].map((i) => {
              // Fix indexing
              const pageNumber = i + 1;
              const href = createDevfileLink({ ...page, number: pageNumber }, query);

              if (page.number - 1 <= pageNumber && pageNumber <= page.number + 1) {
                // Display one page around the current page
                return (
                  <Link
                    scroll={false}
                    shallow
                    href={href}
                    onClick={(): void => dispatch({ type: 'SET_PAGE_NUMBER', payload: pageNumber })}
                    key={pageNumber}
                    className={clsx(
                      page.number === pageNumber
                        ? 'border-devfile/50 text-devfile bg-devfile/10 relative z-10 inline-flex cursor-pointer items-center border px-4 py-2 text-sm font-medium focus:z-20'
                        : 'hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400',
                    )}
                  >
                    {i + 1}
                  </Link>
                );
              }

              if (pageNumber <= 2 || pageNumber > page.total - 2) {
                // Display the first two pages and the last two pages
                // Link only displays when the screen is larger than a large screen
                return (
                  <Link
                    scroll={false}
                    shallow
                    href={href}
                    onClick={(): void => dispatch({ type: 'SET_PAGE_NUMBER', payload: pageNumber })}
                    key={pageNumber}
                    className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative hidden items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 lg:inline-flex"
                  >
                    {i + 1}
                  </Link>
                );
              }
              if (pageNumber === page.number - 2 || pageNumber === page.number + 2) {
                // Displays an addition page around the current page when the screen is smaller than a large screen
                // Displays ellipses when the screen is larger than a large screen
                return (
                  <div key={pageNumber}>
                    <Link
                      scroll={false}
                      shallow
                      href={href}
                      onClick={(): void =>
                        dispatch({ type: 'SET_PAGE_NUMBER', payload: pageNumber })
                      }
                      className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 lg:hidden"
                    >
                      {i + 1}
                    </Link>

                    <span className="relative hidden items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 lg:inline-flex">
                      ...
                    </span>
                  </div>
                );
              }

              return null;
            })}
            <Link
              scroll={false}
              shallow
              href={createDevfileLink({ ...page, number: nextPage }, query)}
              onClick={(): void => {
                dispatch({
                  type: 'SET_PAGE_NUMBER',
                  payload: nextPage,
                });
              }}
              className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center rounded-r-md border border-slate-300 bg-white px-2 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

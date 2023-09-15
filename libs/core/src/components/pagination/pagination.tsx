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

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { DevfileParams } from '../../functions';

export interface PageParams {
  pageNumber: number;
  totalPages: number;
}

export interface PaginationProps {
  pageParams: PageParams;
  devfileParams: DevfileParams;
  setPage: (page: number) => void;
}

export function Pagination(props: PaginationProps): JSX.Element | null {
  const { pageParams, devfileParams, setPage } = props;
  const { pageNumber, totalPages } = pageParams;

  const prevPage = pageNumber > 1 ? pageNumber - 1 : 1;
  const nextPage = pageNumber < totalPages ? pageNumber + 1 : totalPages;

  const devfilesPerPage = devfileParams.devfiles.length;
  const totalDevfiles = devfileParams.total;

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-6 dark:border-slate-800 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={(): void => {
            setPage(prevPage);
          }}
          className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-100"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={(): void => {
            setPage(nextPage);
          }}
          className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-100"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{' '}
            <span className="font-medium">
              {totalDevfiles > 0 ? (pageNumber - 1) * devfilesPerPage + 1 : 0}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {pageNumber * devfilesPerPage < totalDevfiles
                ? pageNumber * devfilesPerPage
                : totalDevfiles}
            </span>{' '}
            of <span className="font-medium">{totalDevfiles}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={(): void => {
                setPage(prevPage);
              }}
              className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center rounded-l-md border border-slate-300 bg-white px-2 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* eslint-disable-next-line unicorn/new-for-builtins */}
            {[...Array(totalPages).keys()].map((i) => {
              // Fix indexing
              const pageNumberIter = i + 1;

              if (pageNumber - 1 <= pageNumberIter && pageNumberIter <= pageNumber + 1) {
                // Display one page around the current page
                return (
                  <button
                    type="button"
                    onClick={(): void => {
                      setPage(pageNumberIter);
                    }}
                    key={pageNumberIter}
                    className={clsx(
                      pageNumber === pageNumberIter
                        ? 'border-devfile/50 text-devfile bg-devfile/10 relative z-10 inline-flex cursor-pointer items-center border px-4 py-2 text-sm font-medium focus:z-20'
                        : 'hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400',
                    )}
                  >
                    {pageNumberIter}
                  </button>
                );
              }

              if (pageNumberIter <= 2 || pageNumberIter > totalPages - 2) {
                // Display the first two pages and the last two pages
                // Link only displays when the screen is larger than a large screen
                return (
                  <button
                    type="button"
                    onClick={(): void => {
                      setPage(pageNumberIter);
                    }}
                    key={pageNumberIter}
                    className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative hidden items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 lg:inline-flex"
                  >
                    {pageNumberIter}
                  </button>
                );
              }

              if (pageNumberIter === pageNumber - 2 || pageNumberIter === pageNumber + 2) {
                // Displays an addition page around the current page when the screen is smaller than a large screen
                // Displays ellipses when the screen is larger than a large screen
                return (
                  <div key={pageNumberIter}>
                    <button
                      type="button"
                      onClick={(): void => setPage(pageNumberIter)}
                      className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 lg:hidden"
                    >
                      {pageNumberIter}
                    </button>

                    <span className="relative hidden items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 lg:inline-flex">
                      ...
                    </span>
                  </div>
                );
              }

              return null;
            })}
            <button
              type="button"
              onClick={(): void => {
                setPage(nextPage);
              }}
              className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center rounded-r-md border border-slate-300 bg-white px-2 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

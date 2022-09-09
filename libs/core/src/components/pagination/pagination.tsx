import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchDevfiles } from '../../hooks';

export function Pagination(): JSX.Element {
  const { pageInfo, dispatch } = useSearchDevfiles();
  const router = useRouter();

  const prevPage = pageInfo.pageNumber > 1 ? pageInfo.pageNumber - 1 : 1;
  const nextPage =
    pageInfo.pageNumber < pageInfo.totalPages ? pageInfo.pageNumber + 1 : pageInfo.totalPages;

  useEffect(() => {
    const match = router.asPath.match(/page=(\d+)/);
    if (match) {
      dispatch({ type: 'SET_PAGE_NUMBER', payload: Number.parseInt(match[1], 10) });
    }
    // Run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-6 dark:border-slate-800 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          scroll={false}
          href={`?page=${prevPage}`}
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
          href={`?page=${nextPage}`}
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
            Showing{' '}
            <span className="font-medium">{(pageInfo.pageNumber - 1) * pageInfo.pageSize + 1}</span>{' '}
            to <span className="font-medium">{pageInfo.pageNumber * pageInfo.pageSize}</span> of{' '}
            <span className="font-medium">{pageInfo.totalDevfiles}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              scroll={false}
              href={`?page=${prevPage}`}
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
            {[...Array(pageInfo.totalPages).keys()].map((i) => {
              // Fix indexing
              const pageNumber = i + 1;

              if (pageInfo.pageNumber - 1 <= pageNumber && pageNumber <= pageInfo.pageNumber + 1) {
                // Display one page around the current page
                return (
                  <Link
                    scroll={false}
                    href={`?page=${pageNumber}`}
                    onClick={(): void => dispatch({ type: 'SET_PAGE_NUMBER', payload: pageNumber })}
                    key={pageNumber}
                    className={clsx(
                      pageInfo.pageNumber === pageNumber
                        ? 'border-devfile/50 text-devfile bg-devfile/10 relative z-10 inline-flex cursor-pointer items-center border px-4 py-2 text-sm font-medium focus:z-20'
                        : 'hover:bg-devfile/10 dark:hover:bg-devfile/10 relative inline-flex items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400',
                    )}
                  >
                    {i + 1}
                  </Link>
                );
              }

              if (pageNumber <= 2 || pageNumber > pageInfo.totalPages - 2) {
                // Display the first two pages and the last two pages
                // Link only displays when the screen is larger than a large screen
                return (
                  <Link
                    scroll={false}
                    href={`?page=${pageNumber}`}
                    onClick={(): void => dispatch({ type: 'SET_PAGE_NUMBER', payload: pageNumber })}
                    key={pageNumber}
                    className="hover:bg-devfile/10 dark:hover:bg-devfile/10 relative hidden items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 focus:z-20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 lg:inline-flex"
                  >
                    {i + 1}
                  </Link>
                );
              }
              if (
                pageNumber === pageInfo.pageNumber - 2 ||
                pageNumber === pageInfo.pageNumber + 2
              ) {
                // Displays an addition page around the current page when the screen is smaller than a large screen
                // Displays ellipses when the screen is larger than a large screen
                return (
                  <div key={pageNumber}>
                    <Link
                      scroll={false}
                      href={`?page=${pageNumber}`}
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
              href={`?page=${nextPage}`}
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

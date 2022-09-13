import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSearchDevfiles } from '../../hooks';
import { createDevfileLink } from '../../functions';

export function DevfileSearch(): JSX.Element {
  const { devfiles, page, query, dispatch } = useSearchDevfiles();

  const prevPage = page.number > 1 ? page.number - 1 : 1;
  const nextPage = page.number < page.total ? page.number + 1 : page.total;

  return (
    <div className="my-6 justify-between sm:flex">
      <div className="group relative grow sm:max-w-[75%] sm:pr-4 lg:sm:max-w-[50%]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="h-5 w-auto flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 dark:group-hover:fill-slate-400"
          />
        </div>
        <div className="sr-only">Devfile search</div>
        <input
          type="search"
          placeholder="Search devfiles"
          className="h-10 w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3.5 text-sm text-slate-400 shadow ring-1 ring-slate-200 group-hover:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:ring-inset dark:ring-white/5 dark:group-hover:bg-slate-700/40 dark:group-hover:ring-slate-500"
          value={query.search}
          onChange={(event): void =>
            dispatch({ type: 'FILTER_ON_SEARCH', payload: event.target.value })
          }
        />
      </div>
      <div className="mt-6 flex items-center justify-between sm:mt-0 sm:justify-start">
        <div className="pr-8">
          <p className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium">{(page.number - 1) * devfiles.limit + 1}</span> -{' '}
            <span className="font-medium">
              {page.number * devfiles.limit < devfiles.searched.length
                ? page.number * devfiles.limit
                : devfiles.searched.length}
            </span>{' '}
            of <span className="font-medium">{devfiles.searched.length}</span>
          </p>
        </div>
        <div className="flex w-16 items-center">
          <Link
            scroll={false}
            href={createDevfileLink({ ...page, number: prevPage }, query)}
            onClick={(): void => {
              dispatch({
                type: 'SET_PAGE_NUMBER',
                payload: prevPage,
              });
            }}
            className="pr-4"
          >
            <ChevronLeftIcon className="h-6 w-auto text-slate-500 dark:text-slate-400" />
          </Link>
          <Link
            scroll={false}
            href={createDevfileLink({ ...page, number: nextPage }, query)}
            onClick={(): void => {
              dispatch({
                type: 'SET_PAGE_NUMBER',
                payload: nextPage,
              });
            }}
          >
            <ChevronRightIcon className="h-6 w-auto text-slate-500 dark:text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DevfileSearch;

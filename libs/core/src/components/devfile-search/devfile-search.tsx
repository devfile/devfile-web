import { Fragment, useState } from 'react';
import clsx from 'clsx';
import { Combobox, Transition } from '@headlessui/react';
import { useSearchDevfiles } from '../../hooks';

export function DevfileSearch(): JSX.Element {
  const { searchedDevfiles, dispatch } = useSearchDevfiles();
  const [query, setQuery] = useState<string>('');

  return (
    <Combobox value={query} onChange={setQuery}>
      <div className="relative my-6">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(str: string): string => str}
            onChange={(event): void => dispatch({ type: 'SEARCH', payload: event.target.value })}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {searchedDevfiles.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              searchedDevfiles.map((devfile) => (
                <Combobox.Option
                  key={devfile.name}
                  className={({ active }): string =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      active ? 'bg-teal-600 text-white' : 'text-gray-900',
                    )
                  }
                  value={devfile.displayName}
                >
                  {({ selected }): JSX.Element => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {devfile.displayName}
                    </span>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

export default DevfileSearch;

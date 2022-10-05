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

import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import type { Dispatch, SetStateAction } from 'react';
import type { Devfile, Version } from '../../functions';

export interface DevfileHeaderProps {
  devfile: Devfile;
  selectedVersion?: Version;
  setSelectedVersion: Dispatch<SetStateAction<Version | undefined>>;
}

export function DevfileHeader(props: DevfileHeaderProps): JSX.Element {
  const { devfile, selectedVersion, setSelectedVersion } = props;

  return (
    <div className="flex justify-between">
      <div className="mr-4 flex max-h-36 space-x-5 lg:min-w-[66%] lg:max-w-[66%]">
        <div className="flex h-36 w-36 flex-shrink-0 items-center justify-center p-2 dark:rounded-md dark:bg-slate-200">
          <img
            src={selectedVersion?.icon || devfile.icon}
            alt={`${devfile.displayName} icon`}
            className="h-auto max-h-32 w-32"
          />
        </div>
        <div className="h-full overflow-y-auto">
          <div className="flex items-baseline">
            <h1 className="mr-2 text-2xl font-bold leading-8 text-slate-700 dark:text-sky-100">
              {devfile.displayName}
            </h1>
            <span className="hidden font-medium leading-6 text-slate-500 dark:text-slate-400 sm:block sm:text-sm">
              {devfile.provider && <span>by {devfile.provider}</span>} •{' '}
              {devfile.type && <span className="capitalize">{devfile.type}</span>}
            </span>
          </div>
          {devfile.provider && (
            <div className="mt-1 whitespace-nowrap text-sm font-medium leading-6 text-slate-500 dark:text-slate-400 sm:hidden">
              by {devfile.provider}
            </div>
          )}
          {devfile.type && (
            <div className="mt-1 text-sm font-medium capitalize leading-6 text-slate-500 dark:text-slate-400 sm:hidden">
              {devfile.type}
            </div>
          )}
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
            {selectedVersion?.description || devfile.description}
          </p>
        </div>
      </div>
      {devfile.versions?.length === 1 && selectedVersion ? (
        <div className="dark:text-devfile relative h-fit cursor-default truncate rounded-lg border border-slate-600 bg-white py-2 pl-3 pr-10 text-left font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5 sm:text-sm">
          {selectedVersion.version} {selectedVersion?.default && '(default)'}
        </div>
      ) : (
        <Listbox
          as="div"
          value={selectedVersion}
          onChange={setSelectedVersion}
          className="relative"
        >
          <Listbox.Label className="sr-only">Starter projects</Listbox.Label>
          <Listbox.Button className="dark:text-devfile container relative cursor-default rounded border border-slate-600 bg-white py-2 pl-3 pr-10 text-left font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5 sm:text-sm">
            <span className="block truncate">
              {selectedVersion?.version}
              {selectedVersion?.default && '(default)'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="container absolute z-10 mt-1 max-h-60 overflow-x-auto rounded-md border border-slate-600 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700 sm:text-sm">
            {devfile.versions?.map((version) => (
              <Listbox.Option
                key={version.version}
                value={version}
                className="ui-selected:text-devfile ui-active:ui-not-selected:text-slate-900 ui-active:ui-not-selected:dark:text-white ui-not-active:ui-not-selected:text-slate-700 ui-not-active:ui-not-selected:dark:text-slate-100 ui-active:bg-slate-100 ui-active:dark:bg-slate-900/40 relative cursor-default select-none py-2 px-4"
              >
                <span className="ui-selected:font-medium block truncate font-normal">
                  {version.version} {version.default && '(default)'}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      )}
    </div>
  );
}

export default DevfileHeader;

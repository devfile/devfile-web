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

import Link from 'next/link';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import type { Devfile } from '../../functions';
import type { DevfileSpec } from '../../types';

export interface DevfileDatalistProps {
  devfile: Devfile;
  devfileVersion?: string;
  devfileSpec: DevfileSpec;
  className?: string;
}

export function DevfileDatalist(props: DevfileDatalistProps): JSX.Element {
  const { devfile, devfileVersion, devfileSpec, className } = props;

  const [, setDevfileVersion] = useQueryParam(
    'devfile-version',
    withDefault(
      StringParam,
      devfileVersion || devfile.versions?.find((versionDevfile) => versionDevfile.default)?.version,
    ),
  );

  const versionDevfile = useMemo(
    () => devfile.versions?.find((vD) => vD.version === devfileVersion),
    [devfile.versions, devfileVersion],
  );

  return (
    <div className={className}>
      <div className="border-b border-slate-200 pb-2 text-lg font-medium leading-8 text-slate-700 dark:border-slate-700 dark:text-sky-100">
        Details
      </div>
      <dl className="divide-y border-slate-200 pl-3 dark:divide-slate-700">
        {versionDevfile?.version && (
          <div className="grid grid-cols-2 py-2.5 lg:block">
            <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Version</dt>
            <dd className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {devfile.versions?.length === 1 ? (
                <div className="rounded py-0.5 pr-10 pl-2.5 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">
                  {versionDevfile.version} {versionDevfile?.default && '(default)'}
                </div>
              ) : (
                <Listbox
                  as="div"
                  value={devfileVersion}
                  onChange={setDevfileVersion}
                  className="relative"
                >
                  <Listbox.Label className="sr-only">Versions</Listbox.Label>
                  <Listbox.Button className="container rounded py-0.5 pr-10 pl-2.5 text-left shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">
                    <span className="block truncate">
                      {versionDevfile?.version} {versionDevfile?.default && '(default)'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="container absolute z-10 mt-1 max-h-60 overflow-x-auto rounded-md border border-slate-600 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700 sm:text-sm">
                    {devfile.versions?.reverse().map((vD) => (
                      <Listbox.Option
                        key={vD.version}
                        value={vD.version}
                        className="ui-selected:text-devfile ui-active:ui-not-selected:text-slate-900 ui-active:ui-not-selected:dark:text-white ui-not-active:ui-not-selected:text-slate-700 ui-not-active:ui-not-selected:dark:text-slate-100 ui-active:bg-slate-100 ui-active:dark:bg-slate-900/40 relative cursor-pointer select-none py-2 px-4"
                      >
                        <span className="ui-selected:font-medium block truncate font-normal">
                          {vD.version} {vD.default && '(default)'}
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              )}
            </dd>
          </div>
        )}
        {versionDevfile?.schemaVersion && (
          <div className="grid grid-cols-2 py-2.5 lg:block">
            <dt className="text-base font-medium text-slate-700 dark:text-sky-100">
              Schema version
            </dt>
            <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400 lg:ml-2.5">
              {versionDevfile.schemaVersion}
            </dd>
          </div>
        )}
        <div className="grid grid-cols-2 py-2.5 lg:block">
          <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Project type</dt>
          <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400 lg:ml-2.5">
            {devfile.projectType}
          </dd>
        </div>
        <div className="grid grid-cols-2 py-2.5 lg:block">
          <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Language</dt>
          <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400 lg:ml-2.5">
            {devfile.language}
          </dd>
        </div>
        {devfile.tags && (
          <div className="grid grid-cols-2 py-2.5 lg:block">
            <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Tags</dt>
            <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <ul className="flex flex-wrap gap-2">
                {devfile.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/?tags=${tag}`}
                      className="bg-devfile/5 hover:bg-devfile/10 active:bg-devfile/20 border-devfile/50 text-devfile inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        {devfile.git?.remotes && (
          <div className="grid grid-cols-2 py-2.5 lg:block">
            <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Git remotes</dt>
            <dd className="text-sm text-slate-500 dark:text-slate-400">
              <ul className="mt-1 flex flex-col gap-1 sm:mt-0 lg:ml-2.5">
                {Object.entries(devfile.git.remotes).map(([remote, link]) => (
                  <li key={remote}>
                    <Link href={link} className="text-devfile">
                      {remote}
                    </Link>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        <div className="grid grid-cols-2 py-2.5 lg:block">
          <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Resources</dt>
          <dd className="text-sm text-slate-500 dark:text-slate-400">
            <ul className="mt-1 flex flex-col gap-1 sm:mt-0 lg:ml-2.5">
              {devfileSpec.metadata?.website && (
                <li>
                  <Link
                    href={devfileSpec.metadata.website}
                    className="text-devfile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Homepage
                  </Link>
                </li>
              )}
              {devfileSpec.metadata?.supportUrl && (
                <li>
                  <Link
                    href={devfileSpec.metadata.supportUrl}
                    className="text-devfile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Support information
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={`${devfile._registry.fqdn || devfile._registry.url}/devfiles/${
                    devfile.name
                  }`}
                  className="text-devfile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Raw devfile
                </Link>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default DevfileDatalist;

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

import clsx from 'clsx';
import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import Link from 'next/link';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import type { DevfileSpec } from '../../types';
import { Devfile } from '../../functions';

export interface DevfileStarterProjectsProps {
  devfile: Devfile;
  starterProjects: NonNullable<DevfileSpec['starterProjects']>;
  className?: string;
}

export function DevfileStarterProjects(props: DevfileStarterProjectsProps): JSX.Element | null {
  const { devfile, starterProjects, className } = props;

  const [selectedProject, setSelectedProject] = useState<typeof starterProjects[number]>(
    starterProjects[0],
  );

  if (starterProjects.length === 0) {
    return null;
  }

  return (
    <div className={clsx(className)}>
      <div className="border-b border-slate-200 pb-2 text-lg font-medium leading-8 text-slate-700 dark:border-slate-700 dark:text-sky-100">
        {starterProjects.length === 1 ? 'Starter project' : 'Starter Projects'}
      </div>
      <div className="my-5 flex flex-col justify-between gap-2 px-3 sm:flex-row sm:px-0">
        <div className="sm:w-1/2 sm:px-3">
          {starterProjects.length === 1 ? (
            <div className="dark:text-devfile container relative cursor-default truncate rounded border border-slate-600 bg-white py-2 pl-3 pr-10 text-left font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5 sm:text-sm">
              {selectedProject.name}
            </div>
          ) : (
            <Listbox
              as="div"
              value={selectedProject}
              onChange={setSelectedProject}
              className="relative"
            >
              <Listbox.Label className="sr-only">Starter projects</Listbox.Label>
              <Listbox.Button className="dark:text-devfile container relative rounded border border-slate-600 bg-white py-2 pl-3 pr-10 text-left font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5 sm:text-sm">
                <span className="block truncate">{selectedProject.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="container absolute z-10 mt-1 max-h-60 overflow-x-auto rounded-md border border-slate-600 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700 sm:text-sm">
                {starterProjects.map((project) => (
                  <Listbox.Option
                    key={project.name}
                    value={project}
                    className="ui-selected:text-devfile ui-active:ui-not-selected:text-slate-900 ui-active:ui-not-selected:dark:text-white ui-not-active:ui-not-selected:text-slate-700 ui-not-active:ui-not-selected:dark:text-slate-100 ui-active:bg-slate-100 ui-active:dark:bg-slate-900/40 relative cursor-pointer select-none py-2 pl-10 pr-4"
                  >
                    <span className="ui-selected:font-medium block truncate font-normal">
                      {project.name}
                    </span>
                    <span className="ui-selected:flex text-devfile/80 absolute inset-y-0 left-0 hidden items-center pl-3">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          )}
          {starterProjects.some((starterProject) => starterProject.description) && (
            <div className="mt-5 h-16 max-h-16 overflow-y-auto text-sm text-slate-500 dark:text-slate-400">
              {selectedProject.description}
            </div>
          )}
        </div>
        <Link
          className="bg-devfile/5 border-devfile/50 text-devfile hover:bg-devfile/10 active:bg-devfile/20 h-fit rounded border py-2 px-4 text-sm font-semibold sm:mr-3"
          href={`${devfile._registry.fqdn || devfile._registry.url}/devfiles/${
            devfile.name
          }/starter-projects/${selectedProject.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </Link>
      </div>
    </div>
  );
}

export default DevfileStarterProjects;

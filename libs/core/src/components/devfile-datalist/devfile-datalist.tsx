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
import type { Devfile, Version } from '../../functions';
import type { DevfileSpec } from '../../types';

export interface DevfileDatalistProps {
  devfile: Devfile;
  selectedVersion?: Version;
  devfileSpec: DevfileSpec;
  className?: string;
}

export function DevfileDatalist(props: DevfileDatalistProps): JSX.Element {
  const { devfile, selectedVersion, devfileSpec, className } = props;

  return (
    <div className={className}>
      <div className="border-b border-slate-200 pb-2 text-lg font-medium leading-8 text-slate-700 dark:border-slate-700 dark:text-sky-100">
        Metadata
      </div>
      <dl className="divide-y border-slate-200 pl-3 dark:divide-slate-700">
        {selectedVersion?.schemaVersion && (
          <div className="grid grid-cols-2 py-2.5 lg:block">
            <dt className="text-base font-medium text-slate-700 dark:text-sky-100">
              Schema version
            </dt>
            <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {selectedVersion.schemaVersion}
            </dd>
          </div>
        )}
        <div className="grid grid-cols-2 py-2.5 lg:block">
          <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Project type</dt>
          <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">{devfile.projectType}</dd>
        </div>
        <div className="grid grid-cols-2 py-2.5 lg:block">
          <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Language</dt>
          <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">{devfile.language}</dd>
        </div>
        {devfile.tags && (
          <div className="grid grid-cols-2 py-2.5 lg:block">
            <dt className="text-base font-medium text-slate-700 dark:text-sky-100">Tags</dt>
            <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <ul className="flex flex-wrap gap-2">
                {devfile.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/?page=1&tags=${tag}`}
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
              <ul className="mt-1 flex flex-col gap-1 sm:mt-0">
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
            <ul className="mt-1 flex flex-col gap-1 sm:mt-0">
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
                  href={`${devfile.devfileRegistry.link}/devfiles/${devfile.name}`}
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

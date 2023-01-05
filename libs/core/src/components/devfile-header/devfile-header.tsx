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

import Image from 'next/image';
import type { Devfile, Version } from '../../functions';

export interface DevfileHeaderProps {
  devfile: Devfile;
  selectedVersion?: Version;
}

export function DevfileHeader(props: DevfileHeaderProps): JSX.Element {
  const { devfile, selectedVersion } = props;

  return (
    <div className="flex justify-between">
      <div className="mr-4 flex max-h-36 space-x-5 lg:min-w-[66%] lg:max-w-[66%]">
        <div className="flex h-36 w-36 flex-shrink-0 items-center justify-center p-2 dark:rounded-md dark:bg-slate-200">
          <Image
            width={128}
            height={128}
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
    </div>
  );
}

export default DevfileHeader;

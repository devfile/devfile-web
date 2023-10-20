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

import Image from 'next/image';
import Link from 'next/link';
import slugify from '@sindresorhus/slugify';
import { Devfile } from '../../functions';

import { getDevfileTagClasses } from '../../functions/get-devfile-tags/get-devfile-tags';

export interface DevfileGridProps {
  devfiles: Devfile[];
}

export function DevfileGrid(props: DevfileGridProps): JSX.Element {
  const { devfiles } = props;

  return (
    <div className="my-4 grow sm:my-6 lg:mr-2">
      <ul className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {devfiles.map((devfile) => (
          <li
            key={`${devfile.name}-${devfile._registry.name}`}
            className="col-span-1 rounded-lg border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800"
          >
            <Link
              className="flex h-full flex-col justify-between p-6"
              href={`/devfiles/${slugify(devfile._registry.name)}/${slugify(devfile.name)}`}
            >
              <div className="flex items-center">
                <div className="mr-4 flex h-24 w-24 flex-shrink-0 items-center justify-center p-2 dark:rounded-md dark:bg-slate-200 md:h-36 md:w-36">
                  {devfile.icon && (
                    <Image
                      src={devfile.icon}
                      alt={`${devfile.displayName} icon`}
                      width={128}
                      height={128}
                      className="h-auto max-h-20 w-20 md:max-h-32 md:w-32"
                    />
                  )}
                </div>
                <div className="h-full grow">
                  <div className="flex items-center justify-between">
                    <h4 className="line-clamp-1 md:line-clamp-2 mr-2 text-xl font-medium leading-6 tracking-tight text-slate-700 dark:text-sky-100 md:font-bold md:leading-8">
                      {devfile.displayName}
                    </h4>
                    {devfile.type !== 'stack' && (
                      <h6 className="hidden text-sm capitalize text-slate-500 dark:text-slate-400 md:block">
                        {devfile.type}
                      </h6>
                    )}
                  </div>
                  {devfile.provider && (
                    <h6 className="mt-1 text-xs text-slate-500 dark:text-slate-400 md:text-sm">
                      by {devfile.provider}
                    </h6>
                  )}
                  <p className="line-clamp-2 md:line-clamp-3 mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400 md:text-sm">
                    {devfile.description}
                  </p>
                </div>
              </div>
              {devfile.tags && (
                <div className="mt-2 flex flex-wrap gap-2 md:mt-4">
                  {devfile.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className={getDevfileTagClasses(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DevfileGrid;

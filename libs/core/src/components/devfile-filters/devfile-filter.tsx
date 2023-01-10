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
import { useState, useId } from 'react';
import type { FilterElement } from './devfile-filters';

export interface DevfileFilterProps {
  name: string;
  capitalize?: boolean;
  filterElements: FilterElement[];
  onFilter: (filterElements: string[]) => void;
}

const checkboxesToDisplay = 5;

export function DevfileFilter(props: DevfileFilterProps): JSX.Element | null {
  const { name, capitalize, filterElements, onFilter } = props;

  const [seeMore, setSeeMore] = useState<boolean>(false);
  const id = useId();

  return (
    <fieldset className="my-5">
      <legend className="ml-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-sky-100">
        {name}
      </legend>
      <ul className={clsx(seeMore && 'h-80 overflow-x-auto')}>
        {filterElements
          .slice(0, seeMore ? filterElements.length : checkboxesToDisplay)
          .map((filterElement) => (
            <li
              key={filterElement.name}
              className="relative flex w-fit items-center whitespace-nowrap"
            >
              <div className="flex h-5 items-center">
                <input
                  id={filterElement.name + id}
                  name={filterElement.name}
                  type="checkbox"
                  checked={filterElement.checked}
                  onChange={(event): void =>
                    onFilter(
                      filterElements.reduce((acc, element) => {
                        // if the checkbox is checked and it's not the one that was clicked, add it to the array
                        if (element.name !== event.target.name && element.checked) {
                          acc.push(element.name);
                        }
                        // if the checkbox is not checked and it's the one that was clicked, add it to the array
                        if (element.name === event.target.name && !element.checked) {
                          acc.push(element.name);
                        }
                        return acc;
                      }, [] as string[]),
                    )
                  }
                  className="text-devfile focus:ring-devfile/80 ml-2 h-4 w-4 rounded border-slate-300 dark:border-slate-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={filterElement.name + id}
                  className={clsx(
                    capitalize && 'capitalize',
                    'text-base text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
                  )}
                >
                  {filterElement.name}
                </label>
              </div>
            </li>
          ))}
      </ul>
      {filterElements.length >= checkboxesToDisplay && (
        <div className="text-devfile mt-2 ml-2">
          {!seeMore && (
            <button type="button" onClick={(): void => setSeeMore(true)}>
              See more
            </button>
          )}
          {seeMore && (
            <button type="button" onClick={(): void => setSeeMore(false)}>
              See less
            </button>
          )}
        </div>
      )}
    </fieldset>
  );
}

export default DevfileFilter;

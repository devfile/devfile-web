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

import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { SetQuery, withDefault, DecodedValueMap } from 'use-query-params';
import { DevfileFilter } from './devfile-filter';

export interface FilterElement {
  name: string;
  checked: boolean;
}

export interface FilterParams {
  registries: FilterElement[];
  tags: FilterElement[];
  types: FilterElement[];
  providers: FilterElement[];
  languages: FilterElement[];
}

const filters: {
  name: string;
  property: keyof FilterParams;
  capitalize: boolean;
}[] = [
  { name: 'Registries', property: 'registries', capitalize: false },
  { name: 'Tags', property: 'tags', capitalize: false },
  { name: 'Types', property: 'types', capitalize: true },
  { name: 'Providers', property: 'providers', capitalize: false },
  { name: 'Languages', property: 'languages', capitalize: false },
];

export type QueryDefault = ReturnType<typeof withDefault>;

export type UseFilters = [
  DecodedValueMap<Record<keyof FilterParams, QueryDefault>>,
  SetQuery<Record<keyof FilterParams, QueryDefault>>,
];

export interface DevfileFiltersProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  filterParams: FilterParams;
  setFilters: UseFilters[1];
}

export function DevfileFilters(props: DevfileFiltersProps): JSX.Element {
  const { filterParams, setFilters, className, ...rest } = props;

  return (
    <ul className={className} {...rest}>
      {filters.map(
        (filter) =>
          // Only show filter if there are multiple options or at least one option is checked
          (filterParams[filter.property].length > 1 ||
            filterParams[filter.property].some((filterElement) => filterElement.checked)) && (
            <li key={filter.name}>
              <DevfileFilter
                name={filter.name}
                filterElements={filterParams[filter.property]}
                capitalize={filter.capitalize}
                onFilter={(filterElements): void =>
                  setFilters({
                    [filter.property]: filterElements,
                  })
                }
              />
            </li>
          ),
      )}
    </ul>
  );
}

export default DevfileFilters;

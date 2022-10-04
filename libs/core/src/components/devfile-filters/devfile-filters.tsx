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

import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { DevfileFilter } from './devfile-filter';
import { useSearchDevfiles, type SearchDevfilesAction } from '../../hooks';

const filters: {
  name: string;
  property: Exclude<SearchDevfilesAction['property'], 'search' | undefined>;
  capitalize: boolean;
}[] = [
  { name: 'Registries', property: 'registries', capitalize: false },
  { name: 'Tags', property: 'tags', capitalize: false },
  { name: 'Types', property: 'types', capitalize: true },
  { name: 'Providers', property: 'providers', capitalize: false },
  { name: 'Languages', property: 'languages', capitalize: false },
];

export function DevfileFilters(
  props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
): JSX.Element {
  const { className, ...rest } = props;

  const { query, dispatch } = useSearchDevfiles();

  return (
    <ul className={className} {...rest}>
      {filters.map(
        (filter) =>
          query[filter.property].length > 1 && (
            <li key={filter.name}>
              <DevfileFilter
                name={filter.name}
                filterElements={query[filter.property]}
                capitalize={filter.capitalize}
                onFilter={(filterElements): void =>
                  dispatch({
                    type: 'FILTER_ON',
                    property: filter.property,
                    payload: filterElements,
                    resetPage: true,
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

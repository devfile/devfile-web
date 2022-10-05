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

import qs from 'query-string';
import type { PageState, QueryState } from '../../hooks';

export function createDevfileLink(page: PageState, query: QueryState): string {
  const registries = query.registries.reduce(
    (acc, registry) => (registry.checked ? [...acc, registry.name] : acc),
    [] as string[],
  );

  const tags = query.tags.reduce(
    (acc, tag) => (tag.checked ? [...acc, tag.name] : acc),
    [] as string[],
  );

  const types = query.types.reduce(
    (acc, type) => (type.checked ? [...acc, type.name] : acc),
    [] as string[],
  );

  const providers = query.providers.reduce(
    (acc, provider) => (provider.checked ? [...acc, provider.name] : acc),
    [] as string[],
  );

  const languages = query.languages.reduce(
    (acc, language) => (language.checked ? [...acc, language.name] : acc),
    [] as string[],
  );

  let queryString = '';

  queryString = qs.stringify(
    { page: page.number, search: query.search, registries, tags, types, providers, languages },
    { arrayFormat: 'comma', skipEmptyString: true, skipNull: true },
  );

  return `?${queryString}`;
}

export default createDevfileLink;

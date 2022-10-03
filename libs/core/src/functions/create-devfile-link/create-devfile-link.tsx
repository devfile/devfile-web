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

import type { PageState, QueryState } from '../../hooks';

export function createDevfileLink(page: PageState, query: QueryState): string {
  const { number } = page;
  const { search, registries, tags, types, providers, languages } = query;

  const filteredRegistries = registries.reduce(
    (acc, registry) => (registry.checked ? [...acc, registry.name] : acc),
    [] as string[],
  );

  const filteredTags = tags.reduce(
    (acc, tag) => (tag.checked ? [...acc, tag.name] : acc),
    [] as string[],
  );

  const filteredTypes = types.reduce(
    (acc, type) => (type.checked ? [...acc, type.name] : acc),
    [] as string[],
  );

  const filteredProviders = providers.reduce(
    (acc, provider) => (provider.checked ? [...acc, provider.name] : acc),
    [] as string[],
  );

  const filteredLanguages = languages.reduce(
    (acc, language) => (language.checked ? [...acc, language.name] : acc),
    [] as string[],
  );

  let link = `?page=${number}`;

  if (search !== '') {
    link += `&search=${search}`;
  }

  if (filteredRegistries.length > 0) {
    link += `&registries=${filteredRegistries.join(',')}`;
  }

  if (filteredTags.length > 0) {
    link += `&tags=${filteredTags.join(',')}`;
  }

  if (filteredTypes.length > 0) {
    link += `&types=${filteredTypes.join(',')}`;
  }

  if (filteredProviders.length > 0) {
    link += `&providers=${filteredProviders.join(',')}`;
  }

  if (filteredLanguages.length > 0) {
    link += `&languages=${filteredLanguages.join(',')}`;
  }

  return link;
}

export default createDevfileLink;

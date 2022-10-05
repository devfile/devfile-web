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

/* Parsing must be done through array indexing */
/* eslint-disable @typescript-eslint/dot-notation */

import qs from 'query-string';

export function parseDevfileLink(link: string): {
  pageNumber: number;
  search: string;
  registries: string[];
  tags: string[];
  types: string[];
  providers: string[];
  languages: string[];
} {
  const { query } = qs.parseUrl(link, { arrayFormat: 'comma' });

  const pageNumber = typeof query['page'] === 'string' ? Number.parseInt(query['page'], 10) : 1;
  const search = typeof query['search'] === 'string' ? query['search'] : '';
  const registries = Array.isArray(query['registries'])
    ? (query['registries'].filter(Boolean) as string[])
    : [];
  const tags = Array.isArray(query['tags']) ? (query['tags'].filter(Boolean) as string[]) : [];
  const types = Array.isArray(query['types']) ? (query['types'].filter(Boolean) as string[]) : [];
  const providers = Array.isArray(query['providers'])
    ? (query['providers'].filter(Boolean) as string[])
    : [];
  const languages = Array.isArray(query['languages'])
    ? (query['languages'].filter(Boolean) as string[])
    : [];

  return { pageNumber, search, registries, tags, types, providers, languages };
}

export default parseDevfileLink;

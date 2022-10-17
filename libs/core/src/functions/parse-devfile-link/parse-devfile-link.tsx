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

import qs, { type ParsedQuery } from 'query-string';

function parseStringArray(value: ParsedQuery[number]): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean) as string[];
  }

  if (typeof value === 'string') {
    return [value];
  }

  return [];
}

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
  const registries = parseStringArray(query['registry']);
  const tags = parseStringArray(query['tags']);
  const types = parseStringArray(query['types']);
  const providers = parseStringArray(query['providers']);
  const languages = parseStringArray(query['languages']);

  return { pageNumber, search, registries, tags, types, providers, languages };
}

export default parseDevfileLink;

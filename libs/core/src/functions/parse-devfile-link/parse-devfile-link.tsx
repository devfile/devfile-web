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
  const queryStringMatch = link.match(/\?(.*)$/);
  const queryString = queryStringMatch ? queryStringMatch[1] : '';

  const results = qs.parse(queryString, { arrayFormat: 'comma' });

  const pageNumber = typeof results['page'] === 'string' ? Number.parseInt(results['page'], 10) : 1;
  const search = typeof results['search'] === 'string' ? results['search'] : '';
  const registries = Array.isArray(results['registries'])
    ? (results['registries'] as string[])
    : [];
  const tags = Array.isArray(results['tags']) ? (results['tags'] as string[]) : [];
  const types = Array.isArray(results['types']) ? (results['types'] as string[]) : [];
  const providers = Array.isArray(results['providers']) ? (results['providers'] as string[]) : [];
  const languages = Array.isArray(results['languages']) ? (results['languages'] as string[]) : [];

  return { pageNumber, search, registries, tags, types, providers, languages };
}

export default parseDevfileLink;

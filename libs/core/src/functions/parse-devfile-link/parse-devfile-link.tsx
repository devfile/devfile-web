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

export function parseDevfileLink(link: string): {
  pageNumber: number;
  search: string;
  registries: string[];
  tags: string[];
  types: string[];
  providers: string[];
  languages: string[];
} {
  const pageNumberMatch = link.match(/page=(\d+)/);
  const pageNumber = pageNumberMatch ? Number.parseInt(pageNumberMatch[1], 10) : 1;

  const searchMatch = link.match(/search=([^&]+)/);
  const search = searchMatch ? searchMatch[1] : '';

  const registriesMatch = link.match(/registries=([^&]+)/);
  const registries = registriesMatch ? registriesMatch[1].split(',') : [];

  const tagsMatch = link.match(/tags=([^&]+)/);
  const tags = tagsMatch ? tagsMatch[1].split(',') : [];

  const typesMatch = link.match(/types=([^&]+)/);
  const types = typesMatch ? typesMatch[1].split(',') : [];

  const providersMatch = link.match(/providers=([^&]+)/);
  const providers = providersMatch ? providersMatch[1].split(',') : [];

  const languagesMatch = link.match(/languages=([^&]+)/);
  const languages = languagesMatch ? languagesMatch[1].split(',') : [];

  return { pageNumber, search, registries, tags, types, providers, languages };
}

export default parseDevfileLink;

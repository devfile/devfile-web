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

import {
  SearchDevfilesProvider,
  DevfileGrid,
  Pagination,
  DevfileSearch,
  DevfileFilters,
  fetchDevfiles,
  getFilterElements,
  type DevfileRegistry,
  type Devfile,
  type QueryState,
  type FilterElement,
} from '@devfile-web/core';
import type { GetStaticProps } from 'next';
import { devfileRegistries } from '../config';

const devfilesPerPage = 15;

export interface IndexProps {
  devfiles: Devfile[];
  devfileRegistries: DevfileRegistry[];
  query: QueryState;
}

export function Index(props: IndexProps): JSX.Element {
  const { devfiles, query } = props;

  return (
    <SearchDevfilesProvider
      devfiles={devfiles}
      devfileRegistries={devfileRegistries}
      devfilesPerPage={devfilesPerPage}
      query={query}
    >
      <div className="flex grow justify-center  bg-slate-50 px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
        <div className="flex max-w-screen-2xl grow justify-center">
          <div className="grow">
            <DevfileSearch />
            <div className="flex">
              <div className="my-6 hidden pr-16 lg:block">
                <h1 className="ml-2 text-xl font-semibold text-slate-700 dark:text-sky-100">
                  Filter by
                </h1>
                <DevfileFilters />
              </div>
              <DevfileGrid className="my-4 grow sm:my-6 lg:mr-2" />
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </SearchDevfilesProvider>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const devfiles = await fetchDevfiles(devfileRegistries);

  const registries: FilterElement[] = devfileRegistries.map((registry) => ({
    name: registry.name,
    checked: false,
  }));
  const tags = getFilterElements(devfiles, 'tags');
  const types = getFilterElements(devfiles, 'type');
  const providers = getFilterElements(devfiles, 'provider');
  const languages = getFilterElements(devfiles, 'language');

  const filtersApplied = 0;

  return {
    props: {
      devfiles: devfiles.slice(0, devfilesPerPage),
      devfileRegistries,
      query: {
        search: '',
        registries,
        tags,
        types,
        providers,
        languages,
        filtersApplied,
      },
    },
  };
};

export default Index;

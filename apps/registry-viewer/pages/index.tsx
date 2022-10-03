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
              <DevfileFilters className="pr-16" />
              <DevfileGrid className="grow" />
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

import {
  SearchDevfilesProvider,
  DevfileGrid,
  Pagination,
  DevfileSearch,
  DevfileFilters,
  fetchDevfiles,
  getFilterElements,
} from '@devfile-web/core';
import type { GetStaticProps } from 'next';
import type { DevfileRegistry, Devfile, QueryState, FilterElement } from '@devfile-web/core';

const devfilesPerPage = 15;

export interface IndexProps {
  devfiles: Devfile[];
  devfileRegistries: DevfileRegistry[];
  query: QueryState;
}

export function Index(props: IndexProps): JSX.Element {
  const { devfiles, devfileRegistries, query } = props;

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
              <DevfileFilters className="w-96" />
              <DevfileGrid />
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </SearchDevfilesProvider>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const devfileRegistries: DevfileRegistry[] = [
    { name: 'Devfile registry', link: 'https://registry.devfile.io' },
    // { name: 'Devfile registry1', link: 'https://registry.devfile.io' },
    // { name: 'Devfile registry2', link: 'https://registry.devfile.io' },
    // { name: 'Devfile registry3', link: 'https://registry.devfile.io' },
    // { name: 'Devfile registry4', link: 'https://registry.devfile.io' },
    // { name: 'Devfile registry5', link: 'https://registry.devfile.io' },
    // { name: 'Devfile registry6', link: 'https://registry.devfile.io' },
    // { name: 'Devfile registry7', link: 'https://registry.devfile.io' },
  ];

  const devfiles = await fetchDevfiles(devfileRegistries);

  const registries: FilterElement[] = devfileRegistries.map((registry) => ({
    name: registry.name,
    checked: false,
  }));
  const tags = getFilterElements(devfiles, 'tags');
  const types = getFilterElements(devfiles, 'type');
  const providers = getFilterElements(devfiles, 'provider');
  const languages = getFilterElements(devfiles, 'language');

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
      },
    },
  };
};

export default Index;

import { SearchDevfilesProvider, DevfileGrid, Pagination, DevfileSearch } from '@devfile-web/core';
import type { GetStaticProps } from 'next';
import type { DevfileJson, DevfileRegistry, Devfile } from '@devfile-web/core';

export interface IndexProps {
  devfiles: Devfile[];
}

export function Index(props: IndexProps): JSX.Element {
  const { devfiles } = props;

  return (
    <div className="flex grow justify-center  bg-slate-50 px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="flex max-w-screen-2xl grow justify-center">
        <SearchDevfilesProvider devfiles={devfiles}>
          <div className="grow">
            <DevfileSearch />
            <DevfileGrid />
            <Pagination />
          </div>
        </SearchDevfilesProvider>
      </div>
    </div>
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

  const res = await Promise.all(
    devfileRegistries.map((devfileRegistry) =>
      fetch(`${devfileRegistry.link}/index/all?icon=base64`),
    ),
  );
  const devfileJsons: DevfileJson[][] = await Promise.all(
    res.map((r) => (r.json() as Promise<DevfileJson[]>) ?? []),
  );
  const devfiles: Devfile[] = devfileRegistries
    .flatMap((devfileRegistry, devfileRegistryIndex) =>
      devfileJsons[devfileRegistryIndex].map((devfile) => ({
        ...devfile,
        devfileRegistry: {
          name: devfileRegistry.name,
          link: devfileRegistry.link,
        },
      })),
    )
    .sort((a, b) =>
      a.displayName.localeCompare(b.displayName, 'en', {
        sensitivity: 'accent',
      }),
    );

  return {
    props: {
      devfiles,
    },
  };
};

export default Index;

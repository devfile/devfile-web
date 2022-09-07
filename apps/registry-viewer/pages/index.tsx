import { useSearchDevfiles, SearchDevfilesProvider } from '@devfile-web/core';
import type { GetStaticProps } from 'next';
import type { Devfile, DevfileRegistry } from '@devfile-web/core';

export interface IndexProps {
  devfileRegistries: DevfileRegistry[];
}

export function Test(): JSX.Element {
  const { searchedDevfileRegistries, dispatch } = useSearchDevfiles();

  return (
    <div>
      <button
        type="button"
        onClick={(): void => dispatch({ type: 'FILTER_ON_TAGS', payload: ['go'] })}
      >
        test
      </button>
      {searchedDevfileRegistries.map((devfileRegistry) => (
        <div key={devfileRegistry.name}>
          <h2>{devfileRegistry.name}</h2>
          <ul className="pl-4">
            {devfileRegistry.devfiles.map((devfile) => (
              <li key={devfile.name}>{devfile.displayName}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Index(props: IndexProps): JSX.Element {
  const { devfileRegistries } = props;

  return (
    <SearchDevfilesProvider devfileRegistries={devfileRegistries}>
      <Test />
    </SearchDevfilesProvider>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const config: Omit<DevfileRegistry, 'devfiles'>[] = [
    { name: 'Devfile registry', link: 'https://registry.devfile.io' },
  ];

  const res = await Promise.all(
    config.map((devfileRegistry) => fetch(`${devfileRegistry.link}/index/all?icon=base64`)),
  );
  const devfiles: Devfile[][] = await Promise.all(
    res.map((r) => (r.json() as Promise<Devfile[]>) ?? []),
  );
  const devfileRegistries: DevfileRegistry[] = config.map(
    (devfileRegistry, devfileRegistryIndex) => ({
      name: devfileRegistry.name,
      link: devfileRegistry.link,
      devfiles: devfiles[devfileRegistryIndex].sort((a, b) =>
        a.displayName.localeCompare(b.displayName, 'en', {
          sensitivity: 'accent',
        }),
      ),
    }),
  );

  return {
    props: {
      devfileRegistries,
    },
  };
};

export default Index;

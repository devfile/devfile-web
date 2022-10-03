import {
  fetchDevfiles,
  DevfileHeader,
  DevfileStarterProjects,
  DevfileDatalist,
  DevfileCodeblock,
  type Devfile,
  type DevfileSpec,
} from '@devfile-web/core';
import slugify from '@sindresorhus/slugify';
import type { GetStaticProps, GetStaticPaths } from 'next';
// @ts-ignore No types available
import { load } from 'js-yaml';
import { devfileRegistries } from '../../../../config';

export interface IndexProps {
  devfile: Devfile;
  devfileSpec: DevfileSpec;
  devfileYaml: string;
}

export function Index(props: IndexProps): JSX.Element {
  const { devfile, devfileSpec, devfileYaml } = props;

  return (
    <div className="flex grow justify-center bg-slate-50 py-10 px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="flex max-w-screen-2xl grow flex-col justify-between overflow-x-auto">
        <DevfileHeader devfile={devfile} />
        <div className="mt-4 flex flex-col justify-between rounded-lg border border-slate-200 bg-white py-5 px-6 shadow dark:border-slate-700 dark:bg-slate-800 lg:flex-row-reverse">
          <DevfileDatalist
            devfile={devfile}
            devfileSpec={devfileSpec}
            className="lg:ml-4 lg:w-60 lg:shrink-0"
          />
          <div className="grow overflow-auto">
            {devfileSpec.starterProjects && (
              <DevfileStarterProjects
                devfile={devfile}
                starterProjects={devfileSpec.starterProjects}
              />
            )}
            <DevfileCodeblock devfileYaml={devfileYaml} className="hidden lg:block" />
          </div>
          <DevfileCodeblock devfileYaml={devfileYaml} className="block lg:hidden" />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
  const devfiles = await fetchDevfiles(devfileRegistries);
  const devfileRegistryId = context.params?.['devfile-registry'] as string;
  const devfileId = context.params?.devfile as string;

  const devfile = devfiles.find(
    (_devfile) =>
      slugify(_devfile.devfileRegistry.name) === devfileRegistryId &&
      slugify(_devfile.name) === devfileId,
  ) as Devfile;

  const res = await fetch(`${devfile.devfileRegistry.link}/devfiles/${devfile.name}`);
  const devfileYaml = await res.text();
  // No types available for js-yaml
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const devfileSpec = load(devfileYaml) as DevfileSpec;

  return {
    props: {
      devfile,
      devfileSpec,
      devfileYaml,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devfiles = await fetchDevfiles(devfileRegistries);
  const paths = devfiles.map((devfile) => ({
    params: {
      'devfile-registry': devfile.devfileRegistry.name,
      devfile: devfile.name,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Index;

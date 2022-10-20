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
  fetchDevfiles,
  DevfileHeader,
  DevfileStarterProjects,
  DevfileDatalist,
  DevfileCodeblock,
  useFetchDevfileYamls,
  type Devfile,
  type DevfileSpec,
  type Version,
} from '@devfile-web/core';
import { useState, useMemo } from 'react';
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

  const { data } = useFetchDevfileYamls(
    `${devfile.devfileRegistry.link}/devfiles/${devfile.name}`,
    devfile.versions?.map((version) => version.version),
  );
  const [selectedVersion, setSelectedVersion] = useState<Version | undefined>(
    devfile.versions?.find((version) => version.default),
  );
  const selectedDevfileSpec = useMemo(
    () =>
      data.find(({ version }) => version === selectedVersion?.version)?.devfileSpec || devfileSpec,
    [data, devfileSpec, selectedVersion?.version],
  );
  const selectedDevfileYaml = useMemo(
    () =>
      data.find(({ version }) => version === selectedVersion?.version)?.devfileYaml || devfileYaml,
    [data, devfileYaml, selectedVersion?.version],
  );

  return (
    <div className="flex grow justify-center bg-slate-50 py-10 px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="flex max-w-screen-2xl grow flex-col justify-between overflow-x-auto">
        <DevfileHeader devfile={devfile} selectedVersion={selectedVersion} />
        <div className="mt-4 flex flex-col justify-between rounded-lg border border-slate-200 bg-white py-5 px-6 shadow dark:border-slate-700 dark:bg-slate-800 lg:flex-row-reverse">
          <DevfileDatalist
            devfile={devfile}
            selectedVersion={selectedVersion}
            setSelectedVersion={setSelectedVersion}
            devfileSpec={selectedDevfileSpec}
            className="lg:ml-4 lg:w-60 lg:shrink-0"
          />
          <div className="grow lg:overflow-x-auto">
            {selectedDevfileSpec.starterProjects && (
              <DevfileStarterProjects
                devfile={devfile}
                starterProjects={selectedDevfileSpec.starterProjects}
              />
            )}
            <DevfileCodeblock
              devfileYaml={selectedDevfileYaml}
              devfileName={devfile.name}
              className="hidden lg:block"
            />
          </div>
          <DevfileCodeblock
            devfileYaml={selectedDevfileYaml}
            devfileName={devfile.name}
            className="block lg:hidden"
          />
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
  );

  if (!devfile) {
    return {
      notFound: true,
    };
  }

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
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devfiles = await fetchDevfiles(devfileRegistries);
  const paths = devfiles.map((devfile) => ({
    params: {
      'devfile-registry': slugify(devfile.devfileRegistry.name),
      devfile: slugify(devfile.name),
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Index;

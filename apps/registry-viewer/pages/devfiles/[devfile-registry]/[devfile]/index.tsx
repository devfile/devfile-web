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
  type Devfile,
  type DevfileSpec,
  type Version,
} from '@devfile-web/core';
import { useState, useMemo } from 'react';
import slugify from '@sindresorhus/slugify';
import type { GetStaticProps, GetStaticPaths } from 'next';
// @ts-ignore No types available
import { load } from 'js-yaml';
import { getDevfileRegistries } from '../../../../config';

export interface IndexProps {
  devfile: Devfile;
  devfileYamls: {
    version: string;
    devfileYaml: string;
  }[];
}

export function Index(props: IndexProps): JSX.Element {
  const { devfile, devfileYamls } = props;

  const [selectedVersion, setSelectedVersion] = useState<Version | undefined>(
    devfile.versions?.find((version) => version.default),
  );

  const selectedDevfileYaml = useMemo(
    () =>
      (
        devfileYamls.find((devfileYaml) => devfileYaml.version === selectedVersion?.version) ||
        devfileYamls[0]
      ).devfileYaml,
    [devfileYamls, selectedVersion?.version],
  );

  const selectedDevfileSpec = useMemo(
    () =>
      // No types available for js-yaml
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      load(selectedDevfileYaml) as DevfileSpec,
    [selectedDevfileYaml],
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
  const devfileRegistries = getDevfileRegistries();
  const devfiles = await fetchDevfiles(devfileRegistries);
  const devfileRegistryId = context.params?.['devfile-registry'] as string;
  const devfileId = context.params?.devfile as string;

  const devfile = devfiles.find(
    (_devfile) =>
      slugify(_devfile._registry.name) === devfileRegistryId &&
      slugify(_devfile.name) === devfileId,
  );

  if (!devfile) {
    return {
      notFound: true,
    };
  }

  let responses: Response[] = [];

  if (devfile.type === 'stack') {
    responses = await Promise.all(
      devfile.versions.map((v) =>
        fetch(`${devfile._registry.url}/devfiles/${devfile.name}/${v.version}`),
      ),
    );
  }

  if (devfile.type === 'sample') {
    responses = [await fetch(`${devfile._registry.url}/devfiles/${devfile.name}`)];
  }

  const results = await Promise.all(
    responses.map((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    }),
  );

  const devfileYamls = results.map((result, index) => ({
    version: devfile.versions ? devfile.versions[index].version : '',
    devfileYaml: result,
  }));

  return {
    props: {
      devfile,
      devfileYamls,
    },
    revalidate: process.env.REVALIDATE_TIME ? Number.parseInt(process.env.REVALIDATE_TIME, 10) : 15,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  // Return empty paths because we don't want to generate anything on build
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  ({
    paths: [],
    fallback: 'blocking',
  });

export default Index;

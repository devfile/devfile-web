/**
 * Copyright 2023 Red Hat, Inc.
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
} from '@devfile-web/core';
import { useMemo } from 'react';
import slugify from '@sindresorhus/slugify';
import type { GetServerSideProps } from 'next';
import { NextAdapter } from 'next-query-params';
import { parse, stringify } from 'query-string';
import { QueryParamProvider } from 'use-query-params';
// @ts-ignore No types available
import { load } from 'js-yaml';
import { getDevfileRegistries } from '../../../../config';

export interface IndexProps {
  devfile: Devfile;
  devfileYaml: string;
  devfileVersion?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function QueryParamAdapter(props: any): JSX.Element {
  return <NextAdapter {...props} shallow={false} />;
}

export function IndexWrapper(props: IndexProps): JSX.Element {
  return (
    <QueryParamProvider
      adapter={QueryParamAdapter}
      options={{
        searchStringToObject: (searchString) => parse(searchString),
        objectToSearchString: (object) =>
          stringify(object, { skipEmptyString: true, skipNull: true }),
      }}
    >
      <Index {...props} />
    </QueryParamProvider>
  );
}

export function Index(props: IndexProps): JSX.Element {
  const { devfile, devfileYaml, devfileVersion } = props;

  const devfileSpec = useMemo(
    () =>
      // No types available for js-yaml
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      load(devfileYaml) as DevfileSpec,
    [devfileYaml],
  );

  return (
    <div className="flex grow justify-center bg-slate-50 py-10 px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="flex max-w-screen-2xl grow flex-col justify-between overflow-x-auto">
        <DevfileHeader devfile={devfile} devfileVersion={devfileVersion} />
        <div className="mt-4 flex flex-col justify-between rounded-lg border border-slate-200 bg-white py-5 px-6 shadow dark:border-slate-700 dark:bg-slate-800 lg:flex-row-reverse">
          <DevfileDatalist
            devfile={devfile}
            devfileVersion={devfileVersion}
            devfileSpec={devfileSpec}
            className="lg:ml-4 lg:w-60 lg:shrink-0"
          />
          <div className="grow lg:overflow-x-auto">
            {devfileSpec.starterProjects && (
              <DevfileStarterProjects
                devfile={devfile}
                starterProjects={devfileSpec.starterProjects}
              />
            )}
            <DevfileCodeblock
              devfileYaml={devfileYaml}
              devfileName={devfile.name}
              className="hidden lg:block"
            />
          </div>
          <DevfileCodeblock
            devfileYaml={devfileYaml}
            devfileName={devfile.name}
            className="block lg:hidden"
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async (context) => {
  const devfileVersionParam = (context.query['devfile-version'] as string) || '';

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

  if (devfile.type === 'sample' && !devfileVersionParam) {
    const response = await fetch(`${devfile._registry.url}/devfiles/${devfile.name}`);

    if (!response.ok) {
      return {
        notFound: true,
      };
    }

    const devfileYaml = await response.text();

    return {
      props: {
        devfile,
        devfileYaml,
      },
    };
  }

  if (devfile.type === 'stack') {
    const devfileVersion =
      devfileVersionParam ||
      devfile.versions?.find((versionDevfile) => versionDevfile.default)?.version;

    if (!devfileVersion) {
      return {
        notFound: true,
      };
    }

    const response = await fetch(
      `${devfile._registry.url}/devfiles/${devfile.name}/${devfileVersion}`,
    );

    if (!response.ok) {
      return {
        notFound: true,
      };
    }

    const devfileYaml = await response.text();

    return {
      props: {
        devfile,
        devfileYaml,
        devfileVersion,
      },
    };
  }

  return {
    notFound: true,
  };
};

export default IndexWrapper;

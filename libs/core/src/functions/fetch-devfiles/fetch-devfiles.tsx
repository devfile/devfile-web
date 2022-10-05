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

export interface DevfileJson {
  name: string;
  displayName: string;
  description: string;
  type: 'sample' | 'stack';
  tags: string[];
  icon: string;
  projectType: string;
  language: string;
  versions?: Version[];
  provider?: string;
  architectures?: string[];
  git?: {
    remotes: {
      [key: string]: string;
    };
  };
}

export interface Version {
  version: string;
  schemaVersion: string;
  default: boolean;
  description: string;
  tags: string[];
  icon: string;
  links?: {
    self: string;
  };
  resources?: string[];
  starterProjects: string[];
  architectures?: string[];
}

export interface DevfileRegistry {
  name: string;
  link: string;
}

export interface Devfile extends DevfileJson {
  devfileRegistry: {
    name: string;
    link: string;
  };
}

export async function fetchDevfiles(devfileRegistries: DevfileRegistry[]): Promise<Devfile[]> {
  const responses = await Promise.all(
    devfileRegistries.map((devfileRegistry) =>
      fetch(`${devfileRegistry.link}/v2index/all?icon=base64`),
    ),
  );

  responses.forEach((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  });

  const devfileJsons: DevfileJson[][] = await Promise.all(
    responses.map((r) => (r.json() as Promise<DevfileJson[]>) ?? []),
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

  return devfiles;
}

export default fetchDevfiles;

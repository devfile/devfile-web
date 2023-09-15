/**
 * Copyright Red Hat
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

interface DevfileJsonBase {
  name: string;
  displayName: string;
  description: string;
  type: 'sample' | 'stack';
  tags: string[];
  icon: string;
  projectType: string;
  language: string;
  versions?: VersionDevfile[];
  provider?: string;
  architectures?: string[];
  git?: {
    remotes: {
      [key: string]: string;
    };
  };
}

interface DevfileJsonSample extends DevfileJsonBase {
  type: 'sample';
  versions?: never;
}

interface DevfileJsonStack extends DevfileJsonBase {
  type: 'stack';
  versions: VersionDevfile[];
}

export type DevfileJson = DevfileJsonSample | DevfileJsonStack;

export interface VersionDevfile {
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

export interface Registry {
  name: string;
  url: string;
  fqdn?: string;
}

export type Devfile = DevfileJson & {
  _registry: Registry;
};

export interface DevfileParams {
  devfiles: Devfile[];
  total: number;
}

export async function fetchDevfiles(registries: Registry[]): Promise<Devfile[]> {
  const responses = await Promise.all(
    registries.map((devfileRegistry) => fetch(`${devfileRegistry.url}/v2index/all?icon=base64`)),
  );

  responses.forEach((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  });

  const devfileJsons: DevfileJson[][] = await Promise.all(
    responses.map((r) => (r.json() as Promise<DevfileJson[]>) ?? []),
  );

  const devfiles: Devfile[] = registries
    .flatMap((registry, devfileRegistryIndex) =>
      devfileJsons[devfileRegistryIndex].map((devfile) => ({
        ...devfile,
        _registry: registry,
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

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

import type { Registry } from '@devfile-web/core';

function isRegistry(registry: unknown): Registry {
  // Check if the registry is an object
  if (typeof registry !== 'object' || registry === null) {
    throw new SyntaxError('Registry is not an object');
  }

  // Check if the properties are present
  if (!('name' in registry)) {
    throw new SyntaxError('Registry name is not defined');
  }

  if (!('url' in registry)) {
    throw new SyntaxError('Registry URL is not defined');
  }

  // Check if the properties are strings
  if (typeof registry.name !== 'string') {
    throw new SyntaxError('Registry name is not a string');
  }

  if (typeof registry.url !== 'string') {
    throw new SyntaxError('Registry URL is not a string');
  }

  // the fqdn is optional
  if ('fqdn' in registry && typeof registry.fqdn !== 'string') {
    throw new SyntaxError('Registry fqdn is not a string');
  }

  return registry as Registry;
}

export const defaultRegistry = {
  name: 'Community',
  url: 'https://registry.stage.devfile.io',
};

export function getDevfileRegistries(): Registry[] {
  let devfileRegistries: Registry[] = [];

  try {
    const res = process.env.DEVFILE_REGISTRIES
      ? (JSON.parse(process.env.DEVFILE_REGISTRIES) as unknown)
      : undefined;

    if (Array.isArray(res)) {
      devfileRegistries = res.map((registry) => isRegistry(registry));
    }
  } catch (error) {
    throw new SyntaxError(
      `${(error as Error).name}: ${
        (error as Error).message
      }, DEVFILE_REGISTRIES is an invalid json string`,
    );
  }

  return devfileRegistries.length > 0 ? devfileRegistries : [defaultRegistry];
}

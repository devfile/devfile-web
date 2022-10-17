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

import type { DevfileRegistry } from '@devfile-web/core';

let envDevfileRegistries: DevfileRegistry[] = [];
try {
  const res = process.env.NEXT_PUBLIC_DEVFILE_REGISTRIES
    ? (JSON.parse(process.env.NEXT_PUBLIC_DEVFILE_REGISTRIES) as unknown)
    : undefined;
  if (
    Array.isArray(res) &&
    res.every(
      (registry) =>
        typeof registry === 'object' &&
        !Array.isArray(registry) &&
        registry !== null &&
        typeof (registry as Record<string, unknown>).name === 'string' &&
        typeof (registry as Record<string, unknown>).link === 'string',
    )
  ) {
    envDevfileRegistries = res as DevfileRegistry[];
  }
} catch (error) {
  throw new SyntaxError(
    `${(error as Error).name}: ${
      (error as Error).message
    }, NEXT_PUBLIC_DEVFILE_REGISTRIES is an invalid json string`,
  );
}

export const devfileRegistries: DevfileRegistry[] =
  envDevfileRegistries.length > 0
    ? envDevfileRegistries
    : [{ name: 'Community', link: 'https://registry.stage.devfile.io' }];

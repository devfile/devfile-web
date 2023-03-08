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

/* eslint-disable @typescript-eslint/require-await */
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import fetchDevfiles from './fetch-devfiles';
import devfiles from './devfiles.json';
import type { Registry, Devfile } from './fetch-devfiles';

enableFetchMocks();

describe('fetchDevfiles', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch devfiles', async () => {
    fetchMock.mockIf('https://registry.devfile.io/v2index/all?icon=base64', async (req) => {
      expect(req.method).toBe('GET');
      return JSON.stringify(devfiles);
    });

    const devfileRegistries: Registry[] = [
      { name: 'Devfile registry', url: 'https://registry.devfile.io' },
    ];

    const customDevfiles = await fetchDevfiles(devfileRegistries);

    const response = await fetch('https://registry.devfile.io/v2index/all?icon=base64');
    const unsortedDevfiles = (await response.json()) as Devfile[];
    const sortedDevfiles: Devfile[] = unsortedDevfiles
      .map((devfile) => ({
        ...devfile,
        _registry: devfileRegistries[0],
      }))
      .sort((a, b) =>
        a.displayName.localeCompare(b.displayName, 'en', {
          sensitivity: 'accent',
        }),
      );

    expect(customDevfiles).toStrictEqual(sortedDevfiles);
  });
});

/* eslint-disable @typescript-eslint/require-await */
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import fetchDevfiles from './fetch-devfiles';
import devfiles from './devfiles.json';
import type { DevfileRegistry, Devfile } from './fetch-devfiles';

enableFetchMocks();

describe('fetchDevfiles', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch devfiles', async () => {
    fetchMock.mockIf('https://registry.devfile.io/index/all?icon=base64', async (req) => {
      expect(req.method).toBe('GET');
      return JSON.stringify(devfiles);
    });

    const devfileRegistries: DevfileRegistry[] = [
      { name: 'Devfile registry', link: 'https://registry.devfile.io' },
    ];

    const customDevfiles = await fetchDevfiles(devfileRegistries);

    const response = await fetch('https://registry.devfile.io/index/all?icon=base64');
    const unsortedDevfiles = (await response.json()) as Devfile[];
    const sortedDevfiles = unsortedDevfiles
      .map((devfile) => ({
        ...devfile,
        devfileRegistry: devfileRegistries[0],
      }))
      .sort((a, b) =>
        a.displayName.localeCompare(b.displayName, 'en', {
          sensitivity: 'accent',
        }),
      );

    expect(customDevfiles).toStrictEqual(sortedDevfiles);
  });
});

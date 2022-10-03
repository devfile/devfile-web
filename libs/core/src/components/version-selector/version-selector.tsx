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

import Link from 'next/link';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useNavigation } from '../../hooks';

export interface VersionSelectorProps {
  className?: string;
}

export function VersionSelector(props: VersionSelectorProps): JSX.Element | null {
  const { className } = props;

  const { selectedVersion, setSelectedVersion, docVersions, docVersionLinks } = useNavigation();
  const router = useRouter();

  if (!router.asPath.includes('/docs') || router.pathname === '/404') {
    return null;
  }

  return (
    <Menu as="div" className={className}>
      <Menu.Button
        className="flex h-6 items-center rounded-lg px-3 text-sm font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:text-slate-400 dark:ring-inset dark:ring-white/5"
        aria-label={selectedVersion}
      >
        <span className="pr-2">{selectedVersion}</span>
        <ChevronDownIcon className="h-4 w-auto" />
      </Menu.Button>
      <Menu.Items className="absolute top-full left-1/2 mt-3 w-32 -translate-x-1/2 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
        {docVersions.map((version) => (
          <Menu.Item
            as={Link}
            key={version}
            href={docVersionLinks[version]}
            onClick={(): void => setSelectedVersion(version)}
            className={clsx(
              'ui-active:bg-slate-100 ui-active:dark:bg-slate-900/40 flex cursor-pointer select-none items-center rounded-[0.625rem] py-1 px-2',
              {
                'text-devfile': version === selectedVersion,
                'ui-active:text-slate-900 ui-active:dark:text-white ui-not-active:text-slate-700 ui-not-active:dark:text-slate-400':
                  version !== selectedVersion,
              },
            )}
          >
            {version}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default VersionSelector;

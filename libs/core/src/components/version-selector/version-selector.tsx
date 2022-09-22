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
            className={({ active }): string =>
              clsx('flex cursor-pointer select-none items-center rounded-[0.625rem] p-1', {
                'text-devfile': version === selectedVersion,
                'text-slate-900 dark:text-white': active && version !== selectedVersion,
                'text-slate-700 dark:text-slate-400': !active && version !== selectedVersion,
                'bg-slate-100 dark:bg-slate-900/40': active,
              })
            }
          >
            <span className="ml-1">{version}</span>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default VersionSelector;

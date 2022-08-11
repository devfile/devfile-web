import Link from 'next/link';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useNavigation } from '../../hooks';

export interface VersionSelectorProps {
  className?: string;
}

export function VersionSelector(props: VersionSelectorProps): JSX.Element | null {
  const { className } = props;

  const { selectedVersion, setSelectedVersion, docVersions } = useNavigation();
  const router = useRouter();

  if (!router.asPath.includes('/docs')) {
    return null;
  }

  return (
    <Menu as="div" className={className}>
      <Menu.Button
        className="flex h-6 w-28 items-center justify-center rounded-lg text-sm font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:text-slate-400 dark:ring-inset dark:ring-white/5"
        aria-label={selectedVersion}
      >
        {selectedVersion}
      </Menu.Button>
      <Menu.Items className="absolute top-full left-1/2 mt-3 w-36 -translate-x-1/2 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
        {docVersions.map((version) => (
          <Menu.Item
            as={Link}
            key={version}
            href={`/docs/${version}/what-is-a-devfile`}
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
            <div className="ml-1">{version}</div>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default VersionSelector;

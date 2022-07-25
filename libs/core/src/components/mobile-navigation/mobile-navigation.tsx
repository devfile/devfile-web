import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dialog } from '@headlessui/react';
import { MenuIcon, XIcon as CloseIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { DevfileIcon } from '../../icons';
import { DesktopNavigation } from '../desktop-navigation/desktop-navigation';
import { useNavigation } from '../../hooks';

export function MobileNavigation(): JSX.Element {
  const { headerNavigation } = useNavigation();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function onRouteChange(): void {
      setIsOpen(false);
    }

    router.events.on('routeChangeComplete', onRouteChange);
    router.events.on('routeChangeError', onRouteChange);

    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
      router.events.off('routeChangeError', onRouteChange);
    };
  }, [router, isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={(): void => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-6 w-6 stroke-slate-500" />
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <Dialog.Panel className="min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 dark:bg-slate-900 sm:px-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={(): void => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon className="h-6 w-6 stroke-slate-500" />
            </button>
            <Link href="/" className="ml-6" aria-label="Home page" passHref>
              <DevfileIcon className="fill-devfile h-9 w-9" />
            </Link>
          </div>
          <div className="mt-4">
            {headerNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-label={item.name}
                className={clsx(
                  !item.image
                    ? 'block px-1 text-base font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300'
                    : 'hidden',
                )}
              >
                {item.image ? (
                  <item.image className="h-6 w-6 fill-slate-500 hover:fill-slate-800 dark:fill-slate-400 dark:hover:fill-slate-300" />
                ) : (
                  item.name
                )}
              </Link>
            ))}
          </div>
          <DesktopNavigation className="mt-5 px-1" />
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default MobileNavigation;

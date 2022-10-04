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

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon as CloseIcon } from '@heroicons/react/24/outline';
import { DevfileIcon } from '../../icons';
import { Navigation } from '../navigation/navigation';

export function MobileNavigation(): JSX.Element {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <Bars3Icon className="h-6 w-auto stroke-slate-400 hover:fill-slate-500 dark:stroke-slate-500 dark:hover:stroke-slate-400" />
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <Dialog.Panel className="container min-h-full max-w-xs bg-white px-4 pt-5 pb-12 dark:bg-slate-900 sm:px-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={(): void => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon className="h-6 w-auto stroke-slate-400 hover:fill-slate-500 dark:stroke-slate-500 dark:hover:stroke-slate-400" />
            </button>
            <Link href="/" className="ml-6" aria-label="Home page" passHref>
              <DevfileIcon className="fill-devfile h-9 w-9" />
            </Link>
          </div>
          <Navigation className="mt-5 px-1" />
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default MobileNavigation;

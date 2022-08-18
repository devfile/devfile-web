import Link from 'next/link';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Popover } from '@headlessui/react';
import { useRouter } from 'next/router';
import { DevfileIcon } from '../../icons';
import { MobileNavigation } from '../mobile-navigation/mobile-navigation';
import { LandingPageSearch as Search } from '../landing-page-search/landing-page-search';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { VersionSelector } from '../version-selector/version-selector';
import { useNavigation } from '../../hooks';

export function Header(): JSX.Element {
  const { headerNavigation, currentSection, currentPage } = useNavigation();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const router = useRouter();

  const is404Page = router.pathname === '/404';
  const isDocsPage = router.pathname.includes('docs');

  useEffect(() => {
    function onScroll(): void {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={clsx(
        'sticky top-0 z-50 flex flex-col justify-center border-b border-slate-200 bg-white px-4 py-2 shadow-md shadow-slate-900/5 transition duration-500 dark:border-slate-800 sm:px-6 lg:flex-row lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent',
      )}
    >
      <div className="flex max-w-screen-2xl grow flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/" aria-label="Home page" passHref className="my-2 flex items-center gap-4">
            <DevfileIcon className="fill-devfile h-9 w-auto" />
            <h3 className="hidden pr-2 text-xl font-semibold text-slate-700 dark:text-sky-100 sm:block">
              Devfile.io
            </h3>
            {!is404Page && <VersionSelector className="relative z-10" />}
          </Link>
        </div>

        <div className="my-2 flex grow items-center justify-end gap-4 lg:hidden">
          {!is404Page && <Search />}
          <Popover className="relative flex items-center">
            <Popover.Button>
              <DotsVerticalIcon
                className="h-6 w-auto stroke-slate-400 hover:fill-slate-500 dark:stroke-slate-500 dark:hover:stroke-slate-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Popover.Panel className="absolute right-0 top-full z-50 mt-4 w-screen max-w-[250px] rounded-lg bg-white shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
              <div className="m-6">
                <div className="flex flex-col gap-4">
                  {headerNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-label={item.name}
                      className="whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
                  <span className="whitespace-nowrap text-base text-slate-500 dark:text-slate-400">
                    Switch theme
                  </span>
                  <ThemeSelector className="relative z-10" isRightAligned />
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
        <div className="my-2 hidden grow items-center justify-end gap-8 lg:flex">
          <ThemeSelector className="relative z-10" />
          {headerNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className="whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
            >
              {item.image ? (
                <item.image className="h-6 w-auto fill-slate-500 hover:fill-slate-800 dark:fill-slate-400 dark:hover:fill-slate-300" />
              ) : (
                item.name
              )}
            </Link>
          ))}
        </div>
      </div>
      {isDocsPage && (
        <div className="my-2 flex max-w-screen-2xl items-center gap-8 border-t border-slate-200 pt-4 dark:border-slate-800 lg:hidden">
          <MobileNavigation />
          <div className="flex items-center overflow-hidden">
            <span className="pr-2 text-slate-500 dark:text-slate-400">{currentSection?.title}</span>
            <ChevronRightIcon className="h-4 w-auto flex-none fill-slate-500 pr-2 dark:fill-slate-400" />
            <span className="whitespace-nowrap text-slate-700 dark:text-sky-100">
              {currentPage?.title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

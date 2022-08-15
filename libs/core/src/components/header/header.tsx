import Link from 'next/link';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { DevfileIcon } from '../../icons';
import { MobileNavigation } from '../mobile-navigation/mobile-navigation';
import { LandingPageSearch as Search } from '../landing-page-search/landing-page-search';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { VersionSelector } from '../version-selector/version-selector';
import { useNavigation } from '../../hooks';

export function Header(): JSX.Element {
  const { headerNavigation } = useNavigation();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
        'sticky top-0 z-50 flex justify-center bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent',
      )}
    >
      <div className="flex max-w-screen-2xl grow flex-wrap items-center justify-between">
        <div className="flex items-center">
          <div className="mr-6 flex lg:hidden">
            <MobileNavigation />
          </div>

          <Link
            href="/"
            aria-label="Home page"
            passHref
            className="my-2 lg:flex lg:items-center lg:gap-4"
          >
            <DevfileIcon className="fill-devfile h-9 w-9 lg:hidden" />
            <DevfileIcon className="fill-devfile hidden h-9 w-auto lg:block" />
            <h3 className="hidden text-xl font-semibold text-slate-700 dark:text-sky-100 lg:block">
              Devfile.io
            </h3>
          </Link>
        </div>

        <div className="relative my-2 flex grow items-center justify-end gap-8">
          <div className="lg:hidden">
            <Search />
          </div>
          <VersionSelector className="relative z-10" />
          <ThemeSelector className="relative z-10 hidden sm:block" />
          {headerNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className={clsx(
                item.image
                  ? 'hidden [@media(min-width:450px)]:block'
                  : 'hidden whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300 lg:block',
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
      </div>
    </div>
  );
}

export default Header;

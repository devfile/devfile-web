import { ChevronRightIcon } from '@heroicons/react/solid';
import { DevfileIcon, LandingPageMeta } from '@devfile-web/core';
import { defaultVersion, docVersions } from '@devfile-web/docs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { custom404Navigation } from '../navigation';

// /docs or /docs/
const docsRegex = /^\/docs\/?$/;
// /docs/devfile/{version}/user-guide/migrating-to-devfile-v2 or /docs/devfile/{version}/user-guide/migrating-to-devfile-v2/
const migratingToDevfileV2Regex =
  /^\/docs\/devfile\/(\d+\.\d+\.\d+)\/user-guide\/migrating-to-devfile-v2\/?$/;

export function Custom404(): JSX.Element {
  const router = useRouter();

  const migratingMatch = router.asPath.match(migratingToDevfileV2Regex);
  let migratingVersion: string | undefined;

  if (migratingMatch) {
    migratingVersion = docVersions.find((version) => version.includes(migratingMatch[1]));
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <LandingPageMeta title="404: Page not found">
        {docsRegex.test(router.asPath) && (
          <meta
            httpEquiv="refresh"
            content={`0; url=${
              custom404Navigation.find((el) => el.name === 'Documentation')?.href ??
              `/docs/${defaultVersion}/what-is-a-devfile`
            }`}
          />
        )}
        {migratingMatch && (
          <meta
            httpEquiv="refresh"
            content={`0; url=/docs/${migratingVersion ?? defaultVersion}/migrating-to-devfile-v2`}
          />
        )}
      </LandingPageMeta>

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 pt-16">
          <DevfileIcon className="fill-devfile mx-auto h-12 w-auto" />
        </div>
        <div className="mx-auto max-w-xl py-16 sm:py-24">
          <div className="text-center">
            <p className="text-devfile text-base font-semibold">404</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-700 dark:text-sky-100 sm:text-5xl sm:tracking-tight">
              This page does not exist.
            </h1>
            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              The page you are looking for could not be found.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-base font-semibold text-slate-500 dark:text-slate-400">
              Popular pages
            </h2>
            <ul className="mt-4 divide-y divide-slate-200 border-t border-b border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {custom404Navigation.map((link) => (
                <li key={link.name} className="group py-6">
                  <Link href={link.href} passHref className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <span className="bg-devfile flex h-12 w-12 items-center justify-center rounded-lg">
                        <link.image className="h-6 w-auto text-sky-100" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium text-slate-700 group-hover:text-slate-800 dark:text-sky-100 dark:group-hover:text-sky-50">
                        {link.name}
                      </h3>
                      <p className="text-base text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">
                        {link.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <ChevronRightIcon
                        className="h-5 w-5 text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/"
                className="text-base font-medium text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                passHref
              >
                Or go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Custom404;

import Link from 'next/link';
import { DevfileIcon } from '../../icons';
import { useNavigation } from '../../hooks';

export function Footer(): JSX.Element {
  const { footerNavigation } = useNavigation();

  return (
    <footer
      className="border-t bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-screen-2xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" aria-label="Home page" passHref className="flex items-center gap-4">
              <DevfileIcon className="fill-devfile h-9 w-auto" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-sky-100">Devfile.io</h3>
            </Link>
            <p className="text-base text-slate-500 dark:text-slate-400">
              An open standard defining containerized development environments.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <span className="sr-only">{item.name}</span>
                  {item.image && (
                    <item.image
                      className="h-6 w-auto fill-slate-500 hover:fill-slate-600 dark:fill-slate-400 dark:hover:fill-slate-300"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-sky-100">
                Contributors
              </h3>
              <ul className="mt-4 space-y-4">
                {footerNavigation.contributors.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group text-base text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                      passHref
                    >
                      {item.image && (
                        <item.image
                          className="inline h-auto w-6 fill-slate-500 group-hover:fill-slate-600 dark:fill-slate-400 dark:group-hover:fill-slate-300"
                          aria-hidden="true"
                        />
                      )}{' '}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-sky-100">
                Links
              </h3>
              <ul className="mt-4 space-y-4">
                {footerNavigation.links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-base text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

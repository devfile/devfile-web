import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import type { InternalDocSearchHit, StoredDocSearchHit } from '@docsearch/react/dist/esm/types';
import { useNavigation } from '../../hooks';

interface HitProps {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: React.ReactNode;
}

const docSearchConfig: { appId: string; apiKey: string; indexName: string } = {
  // @ts-ignore
  appId: process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID,
  // @ts-ignore
  apiKey: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY,
  // @ts-ignore
  indexName: process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME,
};

function Hit(props: HitProps): JSX.Element {
  const { hit, children } = props;

  return <Link href={hit.url}>{children}</Link>;
}

export function LandingPageSearch(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modifierKey, setModifierKey] = useState();
  const router = useRouter();
  const { selectedVersion } = useNavigation();

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useDocSearchKeyboardEvents({ isOpen, onOpen, onClose });

  useEffect(() => {
    // @ts-ignore copied from https://tailwindui.com/templates/syntax example
    setModifierKey(/(mac|iphone|ipod|ipad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ');
  }, []);

  if (!router.asPath.includes('/docs') || router.pathname === '/404') {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="group flex h-6 w-6 items-center justify-center sm:justify-start lg:h-10 lg:w-64 lg:flex-none lg:rounded-lg lg:py-2.5 lg:pl-4 lg:pr-3.5 lg:text-sm lg:ring-1 lg:ring-slate-200 lg:hover:ring-slate-300 dark:lg:bg-slate-800/75 dark:lg:ring-inset dark:lg:ring-white/5 dark:lg:hover:bg-slate-700/40 dark:lg:hover:ring-slate-500"
        onClick={onOpen}
      >
        <MagnifyingGlassIcon className="h-5 w-auto flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 dark:group-hover:fill-slate-400" />
        <span className="sr-only ml-2 hidden text-slate-500 dark:text-slate-400 lg:not-sr-only lg:block">
          Search docs
        </span>
        {modifierKey && (
          <kbd className="ml-auto hidden font-medium text-slate-400 dark:text-slate-500 lg:block">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
      </button>
      {isOpen &&
        createPortal(
          <DocSearchModal
            {...docSearchConfig}
            initialScrollY={window.scrollY}
            onClose={onClose}
            hitComponent={Hit}
            searchParameters={{
              facetFilters: ['language:en', `version:${selectedVersion}`],
            }}
            navigator={{
              navigate({ itemUrl }): void {
                Router.push(itemUrl).catch(() => {});
              },
            }}
          />,
          document.body,
        )}
    </>
  );
}

export default LandingPageSearch;

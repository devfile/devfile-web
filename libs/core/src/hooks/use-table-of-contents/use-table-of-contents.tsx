import { useCallback, useEffect, useState } from 'react';

export interface TableOfContentsChild {
  id?: string;
  title: string;
  children?: never;
}

export interface TableOfContents {
  id?: string;
  title: string;
  children: TableOfContentsChild[];
}

export interface UseTableOfContents {
  currentSection?: string;
}

export function useTableOfContents(tableOfContents: TableOfContents[]): UseTableOfContents {
  const [currentSection, setCurrentSection] = useState<string | undefined>(tableOfContents[0]?.id);

  const getHeadings = useCallback(
    (tableOfContents_: TableOfContents[]) =>
      tableOfContents_
        .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
        .map((id) => {
          if (!id) return;

          // eslint-disable-next-line unicorn/prefer-query-selector
          const el = document.getElementById(id);
          if (!el) return;

          const style = window.getComputedStyle(el);
          const scrollMt = Number.parseFloat(style.scrollMarginTop);

          const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
          return { id, top };
        }),
    [],
  );

  useEffect(() => {
    if (tableOfContents.length === 0) return;
    const headings = getHeadings(tableOfContents);
    function onScroll(): void {
      const top = window.scrollY;
      let current = headings[0]?.id;
      for (const heading of headings) {
        if (heading && top >= heading.top) {
          current = heading?.id;
        } else {
          break;
        }
      }
      setCurrentSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [getHeadings, tableOfContents]);

  return { currentSection };
}

export default useTableOfContents;

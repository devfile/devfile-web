/**
 * Copyright Red Hat
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
  currentPageSection?: string;
}

export function useTableOfContents(tableOfContents: TableOfContents[]): UseTableOfContents {
  const [currentPageSection, setCurrentPageSection] = useState<string | undefined>(
    tableOfContents[0]?.id,
  );

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
      setCurrentPageSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [getHeadings, tableOfContents]);

  return { currentPageSection };
}

export default useTableOfContents;

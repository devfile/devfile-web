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

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { MobileNavigation } from '../mobile-navigation/mobile-navigation';
import { useNavigation } from '../../hooks';

export function HeaderBreadcrumbs(): JSX.Element | null {
  const { currentSection, currentPage } = useNavigation();

  const router = useRouter();

  if (!router.pathname.includes('docs')) {
    return null;
  }

  return (
    <div className="my-2 flex max-w-screen-2xl items-center gap-8 border-t border-slate-200 pt-4 dark:border-slate-800 lg:hidden">
      <MobileNavigation />
      <div className="flex items-center overflow-hidden">
        <span className="whitespace-nowrap pr-2 text-slate-500 dark:text-slate-400">
          {currentSection?.title}
        </span>
        <ChevronRightIcon className="h-4 w-auto flex-none fill-slate-500 pr-2 dark:fill-slate-400" />
        <span className="whitespace-nowrap text-slate-700 dark:text-sky-100">
          {currentPage?.title}
        </span>
      </div>
    </div>
  );
}

export default HeaderBreadcrumbs;

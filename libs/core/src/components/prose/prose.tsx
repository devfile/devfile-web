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

import clsx from 'clsx';

export interface ProseProps {
  className?: string;
  children: React.ReactNode;
}

export function Prose(props: ProseProps): JSX.Element {
  const { className, children } = props;

  return (
    <div
      className={clsx(
        className,
        'prose prose-slate dark:prose-invert max-w-lg dark:text-slate-400 sm:max-w-xl lg:max-w-2xl xl:max-w-4xl',
        // headings
        'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
        // lead
        'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
        // links
        'prose-a:font-semibold dark:prose-a:text-sky-400',
        // link underline
        'prose-a:no-underline prose-a:pb-0.5 prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+1px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)]',
        // pre: styling is done in fence
        // hr
        'dark:prose-hr:border-slate-800',
        // code
        'prose-code:text-[12.5px] prose-code:rounded-md prose-code:p-1 prose-code:font-medium prose-code:text-slate-700 prose-code:shadow-md prose-code:shadow-black/5 prose-code:bg-black/5 prose-code:ring-1 prose-code:ring-black/5 prose-code:dark:bg-slate-700 prose-code:dark:text-devfile prose-code:dark:ring-inset prose-code:dark:ring-white/5',
      )}
    >
      {children}
    </div>
  );
}

export default Prose;

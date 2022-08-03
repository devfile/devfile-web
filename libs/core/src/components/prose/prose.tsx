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
        // pre
        'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
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

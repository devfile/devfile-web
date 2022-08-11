import Link from 'next/link';
import { Icon } from '../icon/icon';
import type { IconOptions } from '../icon/icon';

export interface QuickLinksProps {
  children: JSX.Element;
}

export function QuickLinks(props: QuickLinksProps): JSX.Element {
  const { children } = props;

  return <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>;
}

export interface QuickLinkProps {
  title: string;
  description: string;
  href: string;
  icon: IconOptions;
}

export function QuickLink(props: QuickLinkProps): JSX.Element {
  const { title, description, href, icon } = props;

  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        <Icon icon={icon} className="h-8 w-8" />
        <h2 className="font-display mt-4 text-base text-slate-900 dark:text-white">
          <Link href={href} passHref data-testid="generated-link">
            <span className="absolute -inset-px rounded-xl" />
            {title}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

export default QuickLinks;

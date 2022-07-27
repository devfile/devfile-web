import clsx from 'clsx';
import { Icon } from '../icon/icon';
import type { IconProps } from '../icon/icon';

const styles = {
  note: {
    container: 'bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-sky-900 dark:text-sky-400',
    body: 'text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300',
  },
  warning: {
    container: 'bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300',
  },
};

export type CalloutIconsOptions = 'note' | 'warning';

const icons: Record<CalloutIconsOptions, IconProps> = {
  note: { icon: 'lightbulb' },
  warning: { icon: 'warning', color: 'amber' },
};

export interface CalloutProps {
  type: CalloutIconsOptions;
  title: string;
  children: JSX.Element;
}

export function Callout(props: CalloutProps): JSX.Element {
  const { type = 'note', title, children } = props;

  const iconProps = icons[type];

  return (
    <div className={clsx('my-8 flex rounded-3xl p-6', styles[type].container)}>
      <Icon className="h-8 w-8 flex-none" {...iconProps} />
      <div className="ml-4 flex-auto">
        <p className={clsx('font-display m-0 text-xl', styles[type].title)}>{title}</p>
        <div className={clsx('prose mt-2.5', styles[type].body)}>{children}</div>
      </div>
    </div>
  );
}

export default Callout;

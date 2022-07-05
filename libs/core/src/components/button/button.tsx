import Link from 'next/link';
import clsx from 'clsx';

const styles = {
  primary:
    'rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500',
  secondary:
    'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
};

export interface ButtonProps {
  variant: 'primary' | 'secondary';
  className: string;
  href: string;
}

export function Button(props: ButtonProps): JSX.Element {
  const { variant, className, href, ...rest } = props;

  const buttonClassName = clsx(styles[variant], className);

  return href ? (
    <Link href={href} className={buttonClassName} {...rest} />
  ) : (
    <button type="button" className={className} {...rest} />
  );
}

export default Button;

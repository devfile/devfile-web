import Link from 'next/link';
import clsx from 'clsx';
import { DevfileIcon as DevfileLogoSVG } from '../../icons';

export interface DevfileTitleProps {
  grayscale?: boolean;
  title: string;
}

export function DevfileTitle(props: DevfileTitleProps): JSX.Element {
  const { grayscale, title } = props;

  return (
    <Link href="/">
      <a className="group flex items-center gap-4">
        <DevfileLogoSVG
          className={clsx(
            grayscale
              ? 'fill-gray-500 group-hover:fill-gray-900'
              : 'fill-devfile group-hover:fill-dark-devfile',
            'h-10 w-auto',
          )}
        />
        <h3 className="text-xl font-semibold text-gray-500 group-hover:text-gray-900">{title}</h3>
      </a>
    </Link>
  );
}

export default DevfileTitle;

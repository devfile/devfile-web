import React from 'react';
import { DevfileLogoIcon as DevfileLogoSVG } from '../../images';
import { useMonorepo } from '../../hooks';

export function DevfileBanner(): JSX.Element {
  const { repo, Link } = useMonorepo();

  if (repo === 'landing-page') {
    return (
      <Link href="/" className="flex items-center gap-4">
        <DevfileLogoSVG className="h-10 w-10" />
        <h3 className="text-xl font-semibold text-gray-500">Devfile.io</h3>
      </Link>
    );
  }

  return (
    <Link href="/">
      <a className="flex items-center gap-4">
        <DevfileLogoSVG className="h-10 w-10" />
        <h3 className="text-xl font-semibold text-gray-500">Devfile.io</h3>
      </a>
    </Link>
  );
}

export default DevfileBanner;

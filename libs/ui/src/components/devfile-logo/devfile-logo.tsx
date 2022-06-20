import Link from 'next/link';

export function DevfileLogo(): JSX.Element {
  return (
    <Link href="/">
      <a className="flex items-center gap-4">
        <img className="h-10 w-auto" src="/images/devfile-logo.svg" alt="Devfile.io" />
        <h3 className="text-xl font-semibold text-gray-500">Devfile.io</h3>
      </a>
    </Link>
  );
}

export default DevfileLogo;

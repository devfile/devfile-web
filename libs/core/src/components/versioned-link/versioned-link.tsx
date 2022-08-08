import Link from 'next/link';
import { useNavigation } from '../../hooks';

export interface VersionedLinkProps {
  href: string;
  text: string;
}

export function VersionedLink(props: VersionedLinkProps): JSX.Element {
  const { href, text } = props;

  const { selectedVersion } = useNavigation();

  return <Link href={`./${selectedVersion}${href.replace(/^\./, '')}`}>{text}</Link>;
}

export default VersionedLink;

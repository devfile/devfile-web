import Link from 'next/link';
import { docsNavigation } from '@devfile-web/docs';
import type { DocsNavigation } from '@devfile-web/docs';
import { useNavigation } from '../../hooks';

export interface DocsLinkProps {
  section: string;
  title: string;
  text?: string;
}

export function DocsLink(props: DocsLinkProps): JSX.Element {
  const { section, title, text } = props;

  const { selectedVersion } = useNavigation();

  const link = (docsNavigation as DocsNavigation)[selectedVersion]
    .find((versionedDocsNavigation) => versionedDocsNavigation.title === section)
    ?.links.find((_section) => _section.title === title);

  const href = link?.href ?? `/${section}-${title}`;
  const linkText = text || link?.title || `Section:"${section}" Title:"${title}"`;

  if (text) {
    return (
      <Link data-testid="generated-link" href={href}>
        {link?.href ? linkText : `Not found: ${linkText}`}
      </Link>
    );
  }

  return (
    <p>
      <Link data-testid="generated-link" href={href}>
        {link?.href ? linkText : `Not found: ${linkText}`}
      </Link>
    </p>
  );
}

export default DocsLink;

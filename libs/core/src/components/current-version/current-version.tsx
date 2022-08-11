import { useMemo } from 'react';
import { useNavigation } from '../../hooks';

export interface CurrentVersionProps {
  beforeVersion?: string;
  afterVersion?: string;
  isCodeblock?: boolean;
}

export function CurrentVersion(props: CurrentVersionProps): JSX.Element | string {
  const { beforeVersion, afterVersion, isCodeblock } = props;

  const { selectedVersion } = useNavigation();
  const version = useMemo(() => selectedVersion.replace(/-.*$/, ''), [selectedVersion]);

  if (isCodeblock) {
    return (
      <code>
        {beforeVersion ?? ''}
        {version}
        {afterVersion ?? ''}
      </code>
    );
  }

  return `${beforeVersion ?? ''}${version}${afterVersion ?? ''}`;
}

export default CurrentVersion;

/**
 * Copyright Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

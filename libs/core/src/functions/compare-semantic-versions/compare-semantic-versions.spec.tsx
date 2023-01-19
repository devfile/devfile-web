/**
 * Copyright 2023 Red Hat, Inc.
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

import compareSemanticVersions from './compare-semantic-versions';

const strings = ['1.0.0', '1.5.3', '1.3.3'];
const objects = [{ version: '1.0.0' }, { version: '1.5.3' }, { version: '1.3.3' }];

describe('compareSemanticVersions', () => {
  it('should execute successfully on strings', () => {
    expect(strings.sort(compareSemanticVersions())).toStrictEqual(['1.0.0', '1.3.3', '1.5.3']);
  });

  it('should execute successfully on objects', () => {
    expect(objects.sort(compareSemanticVersions('version'))).toStrictEqual([
      { version: '1.0.0' },
      { version: '1.3.3' },
      { version: '1.5.3' },
    ]);
  });
});

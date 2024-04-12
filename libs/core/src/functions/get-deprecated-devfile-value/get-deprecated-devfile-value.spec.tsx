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

import { DevfileJson } from '../fetch-devfiles/fetch-devfiles';
import { DeprecatedTag } from '../get-devfile-tags/get-devfile-tags';
import {
  IsNotDeprecatedValue,
  IsDeprecatedValue,
  getDeprecatedDevfileValue,
} from './get-deprecated-devfile-value';

let deprecatedDevfileJson: DevfileJson;

let nonDeprecatedDevfileJson: DevfileJson;

describe('getDeprecatedDevfileValue', () => {
  it('should execute successfully', () => {
    deprecatedDevfileJson = {
      name: 'some devfile',
      displayName: 'display name',
      description: 'some description',
      type: 'stack',
      tags: ['three', 'four', DeprecatedTag],
      icon: '',
      projectType: 'python',
      language: 'python',
      versions: [],
      provider: 'provider',
      architectures: [],
      git: {
        remotes: {},
      },
    };
    nonDeprecatedDevfileJson = {
      name: 'some devfile',
      displayName: 'display name',
      description: 'some description',
      type: 'stack',
      tags: ['three', 'four'],
      icon: '',
      projectType: 'python',
      language: 'python',
      versions: [],
      provider: 'provider',
      architectures: [],
      git: {
        remotes: {},
      },
    };
    expect(getDeprecatedDevfileValue(deprecatedDevfileJson)).toEqual(IsDeprecatedValue);
    expect(getDeprecatedDevfileValue(nonDeprecatedDevfileJson)).toEqual(IsNotDeprecatedValue);
  });
});

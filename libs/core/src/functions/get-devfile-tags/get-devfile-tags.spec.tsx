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

import { VersionDevfile, Devfile, Registry } from '../fetch-devfiles/fetch-devfiles';
import { deprecatedTag, getDevfileTags, getDevfileTagClasses } from './get-devfile-tags';

let undefinedVersionDevfile: undefined;

let versionDevfile: VersionDevfile;

let devfile: Devfile;

let registry: Registry;

describe('getDevfileTags', () => {
  it('should execute successfully', () => {
    registry = {
      name: '',
      url: '',
      fqdn: '',
    };
    versionDevfile = {
      version: '2.2.1',
      schemaVersion: '2.1.0',
      tags: ['one', 'two'],
      default: true,
      description: 'some description',
      icon: '',
      starterProjects: [],
    };
    devfile = {
      _registry: registry,
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
    expect(getDevfileTags(undefinedVersionDevfile, devfile)).toEqual(devfile.tags);
    expect(getDevfileTags(versionDevfile, devfile)).toEqual(versionDevfile.tags);
  });
});

describe('getDevfileTags', () => {
  it('should execute successfully', () => {
    const devfileClassName = 'bg-devfile/5 hover:bg-devfile/10 active:bg-devfile/20 border-devfile/50 text-devfile inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium';
    const deprecatedClassName = 'bg-deprecated/5 hover:bg-deprecated/10 active:bg-deprecated/20 border-deprecated/50 text-deprecated inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium';
    expect(getDevfileTagClasses(deprecatedTag)).toEqual(deprecatedClassName);
    expect(getDevfileTagClasses('tag')).toEqual(devfileClassName);
  });
});
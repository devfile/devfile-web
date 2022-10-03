/**
 * Copyright 2022 Red Hat, Inc.
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

import parseDevfileLink from './parse-devfile-link';

const options: {
  parameters: Parameters<typeof parseDevfileLink>;
  expected: ReturnType<typeof parseDevfileLink>;
}[] = [
  // no filters
  {
    parameters: [''],
    expected: {
      pageNumber: 1,
      search: '',
      registries: [],
      tags: [],
      types: [],
      providers: [],
      languages: [],
    },
  },
  // page
  {
    parameters: ['?page=1'],
    expected: {
      pageNumber: 1,
      search: '',
      registries: [],
      tags: [],
      types: [],
      providers: [],
      languages: [],
    },
  },
  // search
  {
    parameters: ['?page=1&search=Test'],
    expected: {
      pageNumber: 1,
      search: 'Test',
      registries: [],
      tags: [],
      types: [],
      providers: [],
      languages: [],
    },
  },
  // registries
  {
    parameters: ['?page=1&registries=Test'],
    expected: {
      pageNumber: 1,
      search: '',
      registries: ['Test'],
      tags: [],
      types: [],
      providers: [],
      languages: [],
    },
  },
  // tags
  {
    parameters: ['?page=1&tags=Test'],
    expected: {
      pageNumber: 1,
      search: '',
      registries: [],
      tags: ['Test'],
      types: [],
      providers: [],
      languages: [],
    },
  },
  // types
  {
    parameters: ['?page=1&types=Test'],
    expected: {
      pageNumber: 1,
      search: '',
      registries: [],
      tags: [],
      types: ['Test'],
      providers: [],
      languages: [],
    },
  },
  // providers
  {
    parameters: ['?page=1&providers=Test'],
    expected: {
      pageNumber: 1,
      search: '',
      registries: [],
      tags: [],
      types: [],
      providers: ['Test'],
      languages: [],
    },
  },
  // languages
  {
    parameters: ['?page=1&languages=Test'],
    expected: {
      pageNumber: 1,
      search: '',
      registries: [],
      tags: [],
      types: [],
      providers: [],
      languages: ['Test'],
    },
  },
  // all filters
  {
    parameters: [
      '?page=1&search=Test&registries=Test&tags=Test&types=Test&providers=Test&languages=Test',
    ],
    expected: {
      pageNumber: 1,
      search: 'Test',
      registries: ['Test'],
      tags: ['Test'],
      types: ['Test'],
      providers: ['Test'],
      languages: ['Test'],
    },
  },
  // multiple registries
  {
    parameters: ['?page=1&registries=Test1,Test2'],
    expected: {
      pageNumber: 1,
      search: '',
      registries: ['Test1', 'Test2'],
      tags: [],
      types: [],
      providers: [],
      languages: [],
    },
  },
];

describe('parseDevfileLink', () => {
  options.forEach((option) => {
    it('should parse link', () => {
      const { parameters, expected } = option;

      expect(parseDevfileLink(...parameters)).toStrictEqual(expected);
    });
  });
});

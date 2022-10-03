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

import mergeObjectsOnDefinedProperties from './merge-objects-on-defined-properties';

const options: {
  parameters: Parameters<typeof mergeObjectsOnDefinedProperties>;
  expected: ReturnType<typeof mergeObjectsOnDefinedProperties>;
}[] = [
  {
    parameters: [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ],
    expected: { a: 3, b: 4 },
  },
  {
    parameters: [{ a: 1, b: 2 }, { a: 3 }],
    expected: { a: 3, b: 2 },
  },
  {
    parameters: [{ a: 1, b: 2 }, { b: 3 }],
    expected: { a: 1, b: 3 },
  },
  {
    parameters: [{ a: 1, b: 2 }, { c: 3 }],
    expected: { a: 1, b: 2 },
  },
];

describe('mergeObjectsOnDefinedProperties', () => {
  options.forEach((option) => {
    it('should merge objects on defined properties', () => {
      const { parameters, expected } = option;

      expect(mergeObjectsOnDefinedProperties(...parameters)).toStrictEqual(expected);
    });
  });
});

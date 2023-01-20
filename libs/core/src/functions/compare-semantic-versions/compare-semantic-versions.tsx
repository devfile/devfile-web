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

/* eslint-disable @typescript-eslint/indent */

export const compareSemanticVersions =
  <TObj extends object & Record<TKey, string>, TKey extends keyof TObj>(key?: TKey) =>
  (a: TObj | string, b: TObj | string): number => {
    // 1. Split the strings into their parts.
    let a1: string[];
    let b1: string[];

    if (key) {
      a1 = (a as TObj)[key].split('.');
      //   ^?
      b1 = (b as TObj)[key].split('.');
    } else {
      a1 = (a as string).split('.');
      b1 = (b as string).split('.');
    }
    // 2. Contingency in case there's a 4th or 5th version
    const len = Math.min(a1.length, b1.length);
    // 3. Look through each version number and compare.
    for (let i = 0; i < len; i += 1) {
      const a2 = +a1[i] || 0;
      const b2 = +b1[i] || 0;

      if (a2 !== b2) {
        return a2 > b2 ? 1 : -1;
      }
    }

    // 4. We hit this if the all checked versions so far are equal
    return b1.length - a1.length;
  };

export default compareSemanticVersions;

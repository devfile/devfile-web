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

import { Devfile, VersionDevfile } from '../fetch-devfiles/fetch-devfiles';

export const DeprecatedTag = 'Deprecated';
/**
 * Checks if a versionDevfile exists and returns its tags. If
 * it doesn't exists returns the devfile tags
 *
 * @returns a list of tags
 */
export function getDevfileTags(
  versionDevfile: VersionDevfile | undefined,
  devfile: Devfile,
): string[] {
  if (versionDevfile !== undefined) {
    return versionDevfile.tags;
  }
  return devfile.tags;
}

/**
 * Checks if the given tag is equal to depracatedTag and returns the necessary css classes
 *
 * @returns the class names according to the given tag
 */
export function getDevfileTagClasses(tag: string): string {
  let colorTag = 'devfile';
  if (tag === DeprecatedTag) {
    colorTag = DeprecatedTag.toLowerCase();
  }
  return `bg-${colorTag}/5 hover:bg-${colorTag}/10 active:bg-${colorTag}/20 border-${colorTag}/50 text-${colorTag} inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium`;
}

export default getDevfileTags;

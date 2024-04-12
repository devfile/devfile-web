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
 * Checks if the given tag is equal to depracatedTag
 *
 * @returns bolean value
 */
export function isDeprecatedDevfile(tag: string): boolean {
  if (tag === DeprecatedTag) {
    return true;
  }
  return false;
}

export default getDevfileTags;

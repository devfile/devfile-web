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

export const IsDeprecatedValue = 'Yes';

export const IsNotDeprecatedValue = 'No';

/**
 * Checks if a devfile tags include the DeprecatedTag
 *
 * @returns 'Yes' or 'No'
 */
export function getDeprecatedDevfileValue(
  devfile: DevfileJson,
): string {
  if (devfile.tags.includes(DeprecatedTag)) {
    return IsDeprecatedValue;
  }
  return IsNotDeprecatedValue;
}

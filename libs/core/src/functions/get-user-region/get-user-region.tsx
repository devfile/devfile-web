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

/**
 * Returns a region
 *
 * @returns the 2 letter region name
 */
export function getUserRegion(): string {
  // Match everything after the first occurrence of "-"
  const regex = /-([\S\s]*)$/;

  // If the locales property is not set try to use the language property
  let region = navigator.language.match(regex)?.[0];

  if (typeof region === 'string') {
    // Slice the "-" off the front
    region = region.slice(1);
  }

  return region ?? '';
}

export default getUserRegion;

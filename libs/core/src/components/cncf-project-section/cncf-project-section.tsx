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

import { CncfIcon } from '../../icons';

export function CncfProjectSection(): JSX.Element {
  return (
    <div className="relative -z-10 bg-slate-50 py-16 dark:bg-slate-900 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <CncfIcon id="cncf-logo" className="mx-auto max-w-prose text-slate-500" />
        <p className="mx-auto mt-5 max-w-prose text-xl text-slate-500 dark:text-slate-400">
          We are a Cloud Native Computing Foundation sandbox project.
        </p>
      </div>
    </div>
  );
}

export default CncfProjectSection;

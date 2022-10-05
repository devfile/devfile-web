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

import { Custom404 as Page404 } from '@devfile-web/core';
import { custom404Navigation } from '../navigation';

export function Custom404(): JSX.Element {
  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <Page404 custom404Navigation={custom404Navigation} />
    </div>
  );
}

export default Custom404;

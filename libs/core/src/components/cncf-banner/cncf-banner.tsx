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

import Link from 'next/link';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function CncfBanner(): JSX.Element | undefined {
  const [showBanner, setShowBanner] = useState<boolean>(true);

  if (showBanner) {
    return (
      <div className="relative bg-red-400">
        <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
          <div className="pr-16 sm:px-16 sm:text-center">
            <p className="font-medium text-white">
              <span className="md:hidden">Big news! We are a CNCF Project.</span>
              <span className="hidden md:inline">
                Big news! We&apos;re proud to announce that we are a Cloud Native Computing
                Foundation sandbox project.
              </span>
              <span className="block sm:ml-2 sm:inline-block">
                <Link href="#" className="font-bold text-white underline" passHref>
                  {' '}
                  Learn more <span aria-hidden="true">&rarr;</span>
                </Link>
              </span>
            </p>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
            <button
              type="button"
              className="flex rounded-md p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(): void => setShowBanner(false)}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return undefined;
}

export default CncfBanner;

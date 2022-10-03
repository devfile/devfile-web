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

import {
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  LockClosedIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Reproducible',
    description:
      'Development environments are now quick to create, can be thrown away at will, and can be easily re-created when needed.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Consistent',
    description:
      'Mechanism for teams to share configurations across projects, and provide a single source of truth throughout the application lifecycle.',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'Secure',
    description:
      'Central location management so updates can be applied once and be properly aligned across development teams.',
    icon: LockClosedIcon,
  },
  {
    name: 'Community',
    description:
      "Share expertise from other developers and communities into your team's development environment.",
    icon: ChatBubbleLeftRightIcon,
  },
];

export function ValuePropositionSection(): JSX.Element {
  return (
    <div className="relative -z-10 bg-slate-50 py-16 dark:bg-slate-900 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-devfile text-base font-semibold uppercase tracking-wider">
          Develop Faster
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-700 dark:text-sky-100 sm:text-4xl">
          Take control of your development environment
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-slate-500 dark:text-slate-400">
          Devfiles defines best practices for your application lifecycle.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-slate-200 px-6 pb-8 dark:bg-slate-800">
                  <div className="-mt-6">
                    <div>
                      <span className="bg-devfile inline-flex items-center justify-center rounded-md p-3 shadow-lg">
                        <feature.icon className="h-6 w-auto text-sky-100" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-slate-700 dark:text-sky-100">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValuePropositionSection;

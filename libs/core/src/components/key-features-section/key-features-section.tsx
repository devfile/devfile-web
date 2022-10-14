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

const keyFeatures = [
  {
    name: 'Stacks & Starter Projects',
    feature:
      'Stacks and starter projects provide an easy mechanism to get applications started or support moving existing applications to containers.',
  },
  {
    name: 'Community Registry',
    feature:
      'A community-hosted registry populated with stacks and samples that are constructed with best practices and contain common tools configurations.',
  },
  {
    name: 'Custom Registry',
    feature:
      'Provision and manage your own enterprise-managed registry that allows you to customize what run times you want to make available to your teams.',
  },
  {
    name: 'Parent Support',
    feature:
      'Leveraging parent support inherits the behavior of an existing devfile stack for updates like security or runtime fixes.',
  },
];

export function KeyFeaturesSection(): JSX.Element {
  return (
    <div className="relative bg-slate-200 py-8 dark:bg-slate-900 sm:py-12">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h3 className="text-3xl font-bold leading-6 text-slate-700 dark:text-sky-100">
          Key Features
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4 lg:mt-8">
          {keyFeatures.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-slate-50 px-4 py-5 shadow dark:bg-slate-800 sm:p-6"
            >
              <dd className="mt-1 mb-2 text-xl font-semibold text-slate-700 dark:text-sky-100">
                {item.name}
              </dd>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {item.feature}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default KeyFeaturesSection;

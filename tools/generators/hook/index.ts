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

import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { names, getProjects } from '@nrwl/devkit';

export default async function (host: Tree, schema: any) {
  const { className, fileName } = names(schema.name);
  const projects = getProjects(host);
  const project = projects.get(schema.project);

  host.write(
    `${project?.root}/src/hooks/use-${fileName}/use-${fileName}.tsx`,
    `
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

import { useState, useCallback } from 'react';

export interface Use${className} {
  count: number;
  increment: () => void;
}

export function use${className}(): Use${className} {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export default use${className};
  `,
  );

  const existingExports = host.read(`${project?.root}/src/hooks/index.ts`, 'utf8')?.trimEnd();

  host.write(
    `${project?.root}/src/hooks/index.ts`,
    `
${existingExports}
export * from './use-${fileName}/use-${fileName}';
  `,
  );

  await formatFiles(host);

  return () => {
    installPackagesTask(host);
  };
}

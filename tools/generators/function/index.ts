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

import { Tree, formatFiles, installPackagesTask } from '@nx/devkit';
import { names, getProjects } from '@nx/devkit';

export default async function (host: Tree, schema: any) {
  const { fileName, propertyName } = names(schema.name);
  const projects = getProjects(host);
  const project = projects.get(schema.project);

  host.write(
    `${project?.root}/src/functions/${fileName}/${fileName}.tsx`,
    `
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

export function ${propertyName}(): boolean {
  return true;
}

export default ${propertyName};
  `,
  );

  host.write(
    `${project?.root}/src/functions/${fileName}/${fileName}.spec.tsx`,
    `
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

import ${propertyName} from './${fileName}'

describe('${propertyName}', () => {
  it('should execute successfully', () => {
    expect(${propertyName}()).toBe(true)
  });
});
  `,
  );

  const existingExports = host.read(`${project?.root}/src/functions/index.ts`, 'utf8')?.trimEnd();

  host.write(
    `${project?.root}/src/functions/index.ts`,
    `
${existingExports}
export * from './${fileName}/${fileName}';
  `,
  );

  await formatFiles(host);

  return () => {
    installPackagesTask(host);
  };
}

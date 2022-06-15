import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { names, getProjects } from '@nrwl/devkit';

export default async function (host: Tree, schema: any) {
  const { fileName, propertyName } = names(schema.name);
  const projects = getProjects(host);
  const project = projects.get(schema.project);

  host.write(
    `${project?.root}/src/functions/${fileName}/${fileName}.tsx`,
    `
export function ${propertyName}(): boolean {
  return true;
}

export default ${propertyName};
  `,
  );

  host.write(
    `${project?.root}/src/functions/${fileName}/${fileName}.spec.tsx`,
    `
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

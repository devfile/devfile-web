import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { names, getProjects } from '@nrwl/devkit';

export default async function (host: Tree, schema: any) {
  const { className, fileName } = names(schema.name);
  const projects = getProjects(host);
  const project = projects.get(schema.project);

  host.write(
    `${project?.root}/src/types/${fileName}.ts`,
    `
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ${className} {}
  `,
  );

  const existingExports = host.read(`${project?.root}/src/types/index.ts`, 'utf8')?.trimEnd();

  host.write(
    `${project?.root}/src/types/index.ts`,
    `
${existingExports}
export * from './${fileName}';
  `,
  );

  await formatFiles(host);

  return () => {
    installPackagesTask(host);
  };
}

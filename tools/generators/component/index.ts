import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { names, getProjects } from '@nrwl/devkit';

export default async function (host: Tree, schema: any) {
  const { className, fileName } = names(schema.name);
  const projects = getProjects(host);
  const project = projects.get(schema.project);

  host.write(
    `${project?.root}/src/components/${fileName}/${fileName}.tsx`,
    `
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ${className}Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ${className}(props: ${className}Props): JSX.Element {

  return (
    <div>
      <h1>Welcome to ${className}!</h1>
    </div>
  );
}

export default ${className};
  `,
  );

  host.write(
    `${project?.root}/src/components/${fileName}/${fileName}.stories.tsx`,
    `
import { Story, Meta } from '@storybook/react';
import ${className}, { ${className}Props } from './${fileName}';

export default {
  component: ${className},
  title: '${className}',
} as Meta;

const Template: Story<${className}Props> = (args) => <${className} {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
  `,
  );

  host.write(
    `${project?.root}/src/components/${fileName}/${fileName}.spec.tsx`,
    `
import { render } from '@testing-library/react';
import ${className} from './${fileName}'

describe('${className}', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<${className} />);
    expect(baseElement).toBeTruthy();
  });
});
  `,
  );

  const existingExports = host.read(`${project?.root}/src/components/index.ts`, 'utf8')?.trimEnd();

  host.write(
    `${project?.root}/src/components/index.ts`,
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

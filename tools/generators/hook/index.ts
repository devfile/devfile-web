import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { names, getProjects } from '@nrwl/devkit';

export default async function (host: Tree, schema: any) {
  const { className, fileName } = names(schema.name);
  const projects = getProjects(host);
  const project = projects.get(schema.project);

  host.write(
    `${project?.root}/src/hooks/use-${fileName}/use-${fileName}.tsx`,
    `
import { useState, useCallback } from 'react';

export interface Use${className} {
  count: number;
  increment: () => void;
}

function use${className}(): Use${className} {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export default use${className};
  `,
  );

  host.write(
    `${project?.root}/src/hooks/use-${fileName}/use-${fileName}.spec.tsx`,
    `
import { act, renderHook } from '@testing-library/react-hooks';
import use${className} from './use-${fileName}'

describe('use${className}', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => use${className}());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
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

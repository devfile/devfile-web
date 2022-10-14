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

import { useState, createContext, useContext, useMemo } from 'react';
// @ts-ignore - no types available
import { dump as jsToYaml } from 'js-yaml';

export interface CodeblockProviderProps {
  children: React.ReactNode;
}

export interface UseCodeblock {
  codeblock?: Record<string, unknown>;
  setCodeblock: React.Dispatch<React.SetStateAction<Record<string, unknown> | undefined>>;
  yaml?: string;
}

const CodeblockContext = createContext<UseCodeblock | undefined>(undefined);

export function CodeblockProvider(props: CodeblockProviderProps): JSX.Element {
  const { children } = props;

  const [codeblock, setCodeblock] = useState<Record<string, unknown> | undefined>();

  const value = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    () => ({ codeblock, setCodeblock, yaml: jsToYaml(codeblock) as string }),
    [codeblock],
  );

  return <CodeblockContext.Provider value={value}>{children}</CodeblockContext.Provider>;
}

export function useCodeblock(): UseCodeblock {
  const value = useContext(CodeblockContext);
  if (!value) {
    throw new Error('Context used outside of its Provider!');
  }

  return value;
}

export default useCodeblock;

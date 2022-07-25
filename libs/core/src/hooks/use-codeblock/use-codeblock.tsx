import { useState, createContext, useContext, useEffect, useMemo } from 'react';
// @ts-ignore - no types available
import { dump as jsToYaml } from 'js-yaml';

export interface CodeblockProviderProps {
  children: JSX.Element;
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
  const [yaml, setYaml] = useState<string | undefined>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setYaml(() => (jsToYaml(codeblock) as string).trimEnd());
  }, [codeblock]);

  const value = useMemo(() => ({ codeblock, setCodeblock, yaml }), [codeblock, yaml]);

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

import { JsonSchemaViewer, useCodeblock } from '@devfile-web/core';
import { promises as fs } from 'node:fs';
import type { GetStaticProps } from 'next';
import type { JSONSchema7 } from 'json-schema';

export interface ApiReferenceProps {
  schema: JSONSchema7;
}

export function ApiReference(props: ApiReferenceProps): JSX.Element {
  const { schema } = props;

  const { codeblock, setCodeblock } = useCodeblock();

  return (
    <>
      <div className="text-3xl font-medium tracking-tight text-slate-700 dark:text-sky-100">
        {schema.title}
      </div>
      <div className="text-base text-slate-500 dark:text-slate-400">{schema.description}</div>
      <JsonSchemaViewer schema={schema} codeblock={codeblock} setCodeblock={setCodeblock} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const schemaString = await fs.readFile(
    './apps/landing-page/public/2.2.0-alpha/devfile-schema.json',
    'utf8',
  );
  const schema = JSON.parse(schemaString) as JSONSchema7;

  return {
    props: {
      schema,
    },
  };
};

export default ApiReference;

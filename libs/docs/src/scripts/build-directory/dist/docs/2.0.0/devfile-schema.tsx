import {
  JsonSchemaViewer,
  useCodeblock,
  Prose,
  LandingPageMeta,
  useNavigation,
} from '@devfile-web/core';
import { promises as fs } from 'fs-extra';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import type { JSONSchema7 } from 'json-schema';

export interface DevfileSchemaProps {
  schema: JSONSchema7;
}

export function DevfileSchema(props: DevfileSchemaProps): JSX.Element {
  const { schema } = props;

  const { codeblock, setCodeblock } = useCodeblock();
  const { currentSection } = useNavigation();

  return (
    <>
      <LandingPageMeta title="Devfile schema - Docs" description="Devfile schema" />
      <article>
        <Prose>
          {(schema.title || currentSection) && (
            <header className="mb-9 space-y-1">
              {currentSection && (
                <p className="font-display text-devfile text-sm font-medium">
                  {currentSection.title}
                </p>
              )}
              {schema.title && (
                <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                  {schema.title}
                </h1>
              )}
            </header>
          )}
          <p>{schema.description}</p>
        </Prose>
        <JsonSchemaViewer schema={schema} codeblock={codeblock} setCodeblock={setCodeblock} />
        <Prose>
          <h2>Additional resources</h2>
          <ul>
            <li>
              <Link data-testid="generated-link" href="/devfile-schemas/2.0.0.json">
                Download the current JSON Schema
              </Link>
            </li>
          </ul>
        </Prose>
      </article>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const schemaString = await fs.readFile(
    './apps/landing-page/public/devfile-schemas/2.0.0.json',
    'utf8',
  );
  const schema = JSON.parse(schemaString) as JSONSchema7;

  return {
    props: {
      schema,
    },
  };
};

export default DevfileSchema;

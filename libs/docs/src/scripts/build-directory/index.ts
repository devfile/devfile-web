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

import { existsSync, rmSync, copySync, writeFileSync } from 'fs-extra';
import { join } from 'node:path';
import { docVersions } from '../../config';
import type { DocVersions } from '../../types';

export interface Config {
  sourceDir: string;
  outputDir: string;
  nextjsDocsDir: string;
}

export default function buildDirectory(config: Config): void {
  const { sourceDir, outputDir, nextjsDocsDir } = config;

  if (existsSync(outputDir)) {
    rmSync(outputDir, { recursive: true, force: true });
  }

  docVersions.forEach((version) => {
    const versionedOutputDir = join(outputDir, version);
    copySync(join(sourceDir, version), versionedOutputDir, { overwrite: true });
    copySync(join(sourceDir, 'no-version'), versionedOutputDir, { overwrite: true });
    writeFileSync(join(versionedOutputDir, 'devfile-schema.tsx'), buildDevfileSchemaPage(version), {
      encoding: 'utf8',
    });
  });

  if (existsSync(nextjsDocsDir)) {
    rmSync(nextjsDocsDir, { recursive: true, force: true });
  }
  copySync(outputDir, nextjsDocsDir, { overwrite: true });
}

export function buildDevfileSchemaPage(version: DocVersions): string {
  return `
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
              <Link data-testid="generated-link" href="/devfile-schemas/${version}.json">
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
    './apps/landing-page/public/devfile-schemas/${version}.json',
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
    `;
}

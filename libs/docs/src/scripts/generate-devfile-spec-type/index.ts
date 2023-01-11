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

import {
  quicktype,
  InputData,
  JSONSchemaInput,
  FetchingJSONSchemaStore,
  type SerializedRenderResult,
} from 'quicktype-core';
import { readFileSync, writeFileSync } from 'fs-extra';
import { docVersions } from '../../config';

export interface Config {
  sourceDir: string;
  outputDir: string;
}

async function quicktypeJSONSchema(
  targetLanguage: string,
  typeName: string,
  jsonSchemaString: string,
): Promise<SerializedRenderResult> {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

  // We could add multiple schemas for multiple types,
  // but here we're just making one type from JSON schema.
  await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

  const result = await quicktype({
    inputData,
    lang: targetLanguage,
  });

  return result;
}

export default async function generateDevfileSpecType(config: Config): Promise<void> {
  const { sourceDir, outputDir } = config;

  const jsonSchema = readFileSync(
    `${sourceDir}/${docVersions[docVersions.length - 1]}.json`,
    'utf8',
  );

  const { lines } = await quicktypeJSONSchema('typescript', 'DevfileSpec', jsonSchema);

  const devfileSpec = lines.join('\n');

  writeFileSync(`${outputDir}/devfile-spec.ts`, devfileSpec, 'utf8');
}

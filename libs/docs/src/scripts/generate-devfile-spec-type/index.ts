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

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

import { useMemo } from 'react';
import slugify from '@sindresorhus/slugify';
import type { JSONSchema7 } from 'json-schema';
import { JsonSchemaViewerElement } from './json-schema-viewer-element';
import type {
  PropertyRestrictions,
  CodeProperties,
  CodeProperty,
} from './json-schema-viewer-element';

export interface JsonSchemaViewerProps {
  schema: JSONSchema7;
  className?: string;
  selectedAllOf?: PropertyRestrictions;
  selectedAnyOf?: PropertyRestrictions;
  selectedOneOf?: PropertyRestrictions;
  propertyRestrictions?: string[];
  slug?: string;
  codeblock?: Record<string, unknown>;
  setCodeblock: React.Dispatch<React.SetStateAction<Record<string, unknown> | undefined>>;
  parentProperties?: CodeProperties[];
}

/**
 * A component that renders a JSON schema as a tree.
 *
 * https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01
 * Currently does not display the schemas...
 * const
 * additionalItems
 * maxItems
 * minItems
 * uniqueItems
 * contains
 * maxProperties
 * minProperties
 * patternProperties
 * additionalProperties
 * dependencies
 * propertyNames
 * if
 * then
 * else
 * allOf - logic is almost done but not complete since we don't current use this property
 * anyOf - logic is almost done but not complete since we don't current use this property
 * not
 * format
 * contentMediaType
 * contentEncoding
 * definitions
 * examples
 */
export function JsonSchemaViewer(props: JsonSchemaViewerProps): JSX.Element {
  const {
    schema,
    className,
    selectedOneOf,
    propertyRestrictions,
    slug,
    codeblock,
    setCodeblock,
    parentProperties,
  } = props;
  const required = useMemo(() => {
    let arr: string[] = [];

    if (schema.required) {
      arr = [...schema.required];
    }

    if (selectedOneOf) {
      arr = [...arr, ...selectedOneOf.values];
    }

    return arr;
  }, [schema.required, selectedOneOf]);
  const siblingProperties: (CodeProperty | null)[] = useMemo(
    () =>
      required.map((title) => {
        if (schema.properties) {
          const childSchema = schema.properties[title];
          if (typeof childSchema !== 'boolean') {
            return {
              title,
              type: childSchema.type ? String(childSchema.type) : '',
              isEnum: !!childSchema.enum,
            };
          }
        }
        return null;
      }),
    [required, schema.properties],
  );

  const newParentProperties: CodeProperties[] = useMemo(() => {
    const codeProperties: CodeProperties = {
      siblingProperties,
    };

    if (parentProperties) {
      return [...parentProperties, codeProperties];
    }

    return [codeProperties];
  }, [parentProperties, siblingProperties]);

  return (
    <div className={className}>
      {Object.entries(schema.properties ?? {}).map(
        ([title, schema_]) =>
          typeof schema_ !== 'boolean' &&
          isSchemaRendered(title, selectedOneOf, propertyRestrictions) && (
            <JsonSchemaViewerElement
              title={title}
              key={title}
              schema={schema_}
              isRequired={required.includes(title)}
              slug={slug ? slugify(`${slug}-${title}`) : slugify(title)}
              codeblock={codeblock}
              setCodeblock={setCodeblock}
              parentProperties={newParentProperties}
            />
          ),
      )}
    </div>
  );
}

function isSchemaRendered(
  title: string,
  // uncomment for allOf and anyOf - logic is almost done but not complete since we don't current use these properties
  // selectedAllOf?: PropertyRestrictions,
  // selectedAnyOf?: PropertyRestrictions,
  selectedOneOf?: PropertyRestrictions,
  propertyRestrictions?: string[],
): boolean {
  if (propertyRestrictions?.includes(title)) {
    return !!selectedOneOf?.values.includes(title);
  }

  return true;
}

export default JsonSchemaViewer;

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

import { useState, useEffect, useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { MinusSmallIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import slugify from '@sindresorhus/slugify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { JsonSchemaViewerDescription as Description } from './json-schema-viewer-description';
import { JsonSchemaViewerPanel as Panel } from './json-schema-viewer-panel';
import { JsonSchemaViewerDropdown as Dropdown } from './json-schema-viewer-dropdown';
import { JsonSchemaViewerTags as Tags } from './json-schema-viewer-tags';

export interface JsonSchemaViewerElementProps {
  schema: JSONSchema7;
  title: string;
  isRequired: boolean;
  slug: string;
  codeblock?: Record<string, unknown>;
  setCodeblock: React.Dispatch<React.SetStateAction<Record<string, unknown> | undefined>>;
  parentProperties: CodeProperties[];
}

export function JsonSchemaViewerElement(props: JsonSchemaViewerElementProps): JSX.Element {
  const { schema, title, isRequired, slug, codeblock, setCodeblock, parentProperties } = props;

  const { oneOf, propertyRestrictions } = getPropertiesRestrictions(schema);
  const [selectedOneOf, setSelectedOneOf] = useState<PropertyRestrictions | undefined>(
    oneOf.length > 0 ? oneOf[0] : undefined,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const href = `${router.pathname}#${slug}`;
  const newParentProperties: CodeProperties[] = useMemo(
    () => getParentProperties(parentProperties, schema, title),
    [parentProperties, schema, title],
  );
  const isActive = router.asPath.includes(href);

  useEffect(() => {
    if (router.asPath.includes(href)) {
      setIsOpen(true);
      const selected = oneOf.find((e) => router.asPath.includes(`${href}-${slugify(e.name)}`));
      if (selected) {
        setSelectedOneOf(() => selected);
      }
    }
    // only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (router.asPath === href) {
      setCodeblock(() => getCode(newParentProperties));
    }
    // only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (router.asPath === href) {
      setCodeblock(() => getCode(newParentProperties));
    }
  }, [href, newParentProperties, router.asPath, setCodeblock]);

  return (
    <Disclosure as="div">
      <div className="my-1">
        <div className="group flex items-center justify-between">
          <div className="flex items-center">
            <Disclosure.Button
              // Eslint bug
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              as={Link}
              href={href}
              className={clsx(
                'flex items-center',
                hasChildren(schema) ? 'cursor-pointer' : 'cursor-default',
              )}
              onClick={(): void => setIsOpen(!isOpen)}
            >
              {hasChildren(schema) ? (
                <ChevronRightIcon
                  className={clsx(
                    'inline h-4 w-auto pr-1 text-slate-700 dark:text-sky-100',
                    isOpen && 'rotate-90 transform',
                  )}
                />
              ) : (
                <MinusSmallIcon className="inline h-4 w-auto pr-1 text-slate-700 dark:text-sky-100" />
              )}
              <span
                className={clsx(
                  'pr-1 font-semibold',
                  isActive ? 'text-devfile' : 'text-slate-700 dark:text-sky-100',
                )}
              >
                {title}
              </span>
              <span className="pr-1 text-slate-700 dark:text-slate-400">{getType(schema)}</span>
            </Disclosure.Button>
            <Dropdown
              className="pr-1"
              dropdownText="One of"
              propertyRestrictions={oneOf}
              selectedPropertyRestriction={selectedOneOf}
              setSelectedPropertyRestriction={setSelectedOneOf}
            />
          </div>

          <div className="relative grow">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-white group-hover:border-slate-200 dark:border-slate-900 dark:group-hover:border-slate-800" />
            </div>
          </div>

          <div>
            {schema.readOnly && (
              <span className="pl-1 text-sm text-amber-600 dark:text-amber-500">read only</span>
            )}
            {schema.writeOnly && (
              <span className="pl-1 text-sm text-amber-600 dark:text-amber-500">write only</span>
            )}
            {isRequired && (
              <span className="pl-1 text-sm text-amber-600 dark:text-amber-500">required</span>
            )}
          </div>
        </div>

        <div className="pl-5">
          <Description description={schema.description} />

          <Tags schema={schema} className="text-slate-700 dark:text-slate-400 [&>*]:py-0.5" />
        </div>

        {isOpen && (
          <Disclosure.Panel static>
            <Panel
              schema={schema}
              selectedOneOf={selectedOneOf}
              propertyRestrictions={propertyRestrictions}
              slug={slug}
              codeblock={codeblock}
              setCodeblock={setCodeblock}
              parentProperties={newParentProperties}
            />
          </Disclosure.Panel>
        )}
      </div>
    </Disclosure>
  );
}

export function getType(schema: JSONSchema7): string {
  if (
    schema.type === 'array' &&
    !Array.isArray(schema.items) &&
    schema.items &&
    typeof schema.items !== 'boolean'
  ) {
    return `Array<${schema.items.type as string}>`;
  }

  if (
    schema.type === 'object' &&
    schema.additionalProperties &&
    typeof schema.additionalProperties !== 'boolean'
  ) {
    return `Map<string, ${schema.additionalProperties.type as string}>`;
  }

  return schema.type as string;
}

export function hasChildren(schema: JSONSchema7): boolean {
  if (!Array.isArray(schema.items) && schema.items && typeof schema.items !== 'boolean') {
    return !!schema.items.properties;
  }
  return !!schema.properties;
}

export interface PropertyRestrictions {
  name: string;
  values: string[];
}

export interface GetPropertiesRestrictions {
  allOf: PropertyRestrictions[];
  anyOf: PropertyRestrictions[];
  oneOf: PropertyRestrictions[];
  propertyRestrictions: string[];
}

export function propertiesReducer(
  prev: PropertyRestrictions[],
  curr: JSONSchema7Definition,
): PropertyRestrictions[] {
  if (typeof curr !== 'boolean' && curr.required) {
    return [...prev, { name: curr.required[0], values: curr.required }];
  }

  return prev;
}

export function getPropertiesRestrictions(schema: JSONSchema7): GetPropertiesRestrictions {
  let allOf: PropertyRestrictions[] = [];
  let anyOf: PropertyRestrictions[] = [];
  let oneOf: PropertyRestrictions[] = [];

  if (schema.type === 'object') {
    allOf = (schema.allOf || []).reduce(
      (prev, curr) => propertiesReducer(prev, curr),
      [] as PropertyRestrictions[],
    );

    anyOf = (schema.anyOf || []).reduce(
      (prev, curr) => propertiesReducer(prev, curr),
      [] as PropertyRestrictions[],
    );

    oneOf = (schema.oneOf || []).reduce(
      (prev, curr) => propertiesReducer(prev, curr),
      [] as PropertyRestrictions[],
    );
  }

  if (
    schema.type === 'array' &&
    !Array.isArray(schema.items) &&
    schema.items &&
    typeof schema.items !== 'boolean'
  ) {
    allOf = (schema.items.allOf || []).reduce(
      (prev, curr) => propertiesReducer(prev, curr),
      [] as PropertyRestrictions[],
    );

    anyOf = (schema.items.anyOf || []).reduce(
      (prev, curr) => propertiesReducer(prev, curr),
      [] as PropertyRestrictions[],
    );

    oneOf = (schema.items.oneOf || []).reduce(
      (prev, curr) => propertiesReducer(prev, curr),
      [] as PropertyRestrictions[],
    );
  }

  // the set removes duplicates
  const propertyRestrictions = [
    ...new Set(
      // uncomment for allOf and anyOf - logic is almost done but not complete since we don't current use these properties
      // ...allOf.flatMap(({ values: values_ }) => values_),
      // ...anyOf.flatMap(({ values: values_ }) => values_),
      oneOf.flatMap(({ values: values_ }) => values_),
    ),
  ];

  return { allOf, anyOf, oneOf, propertyRestrictions };
}

export interface CodeProperty {
  title: string;
  type: string;
  isEnum: boolean;
}

export interface CodeProperties {
  mainProperty?: CodeProperty;
  siblingProperties: (CodeProperty | null)[];
}

export function getCode(properties: CodeProperties[]): Record<string, unknown> {
  let newCode: Record<string, unknown> = {};
  const { mainProperty, siblingProperties } = properties[0];

  if (properties.length > 1) {
    const childrenCode = getCode(properties.slice(1));
    siblingProperties.forEach((sibling) => {
      if (sibling) {
        newCode = addCode(sibling, newCode);
      }
    });
    if (mainProperty && mainProperty.type === 'object') {
      newCode[mainProperty.title] = childrenCode;
    }
    if (mainProperty && mainProperty.type === 'array') {
      newCode[mainProperty.title] = [childrenCode];
    }
  } else {
    siblingProperties.forEach((sibling) => {
      if (sibling) {
        newCode = addCode(sibling, newCode);
      }
    });
    if (mainProperty) {
      newCode = addCode(mainProperty, newCode);
    }
  }

  return newCode;
}

export function addCode(
  codeProperty: CodeProperty,
  code: Record<string, unknown>,
): Record<string, unknown> {
  const { title, type, isEnum } = codeProperty;
  const newCode = { ...code };

  switch (type) {
    case 'object': {
      newCode[title] = {
        '...': '...',
      };
      break;
    }
    case 'array': {
      newCode[title] = [];
      break;
    }
    default:
      newCode[title] = isEnum ? 'enum' : type;
  }

  return newCode;
}

export function getParentProperties(
  parentProperties: CodeProperties[],
  schema: JSONSchema7,
  title: string,
): CodeProperties[] {
  return parentProperties.map((parentProperty, propIndex) => {
    if (propIndex === parentProperties.length - 1) {
      return {
        mainProperty: {
          title,
          type: schema.type ? String(schema.type) : '',
          isEnum: !!schema.enum,
        },
        siblingProperties: parentProperty.siblingProperties,
      };
    }
    return parentProperty;
  });
}

export default JsonSchemaViewerElement;

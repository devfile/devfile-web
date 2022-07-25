import { useState, useEffect, useMemo } from 'react';
import { Disclosure, Listbox } from '@headlessui/react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MinusSmIcon, ChevronRightIcon, SelectorIcon } from '@heroicons/react/outline';
import slugify from '@sindresorhus/slugify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import type { Language } from 'prism-react-renderer';
import { Fence } from '../fence/fence';

export interface JsonSchemaViewerProps {
  schema: JSONSchema7;
  className?: string;
  selectedAllOf?: PropertyRestrictions;
  selectedAnyOf?: PropertyRestrictions;
  selectedOneOf?: PropertyRestrictions;
  propertyRestrictions?: string[];
  slug?: string;
  codeblock: Record<string, unknown>;
  setCodeblock: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
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

interface JsonSchemaViewerElementProps {
  schema: JSONSchema7;
  title: string;
  isRequired: boolean;
  slug: string;
  codeblock: Record<string, unknown>;
  setCodeblock: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  parentProperties: CodeProperties[];
}

function JsonSchemaViewerElement(props: JsonSchemaViewerElementProps): JSX.Element {
  const { schema, title, isRequired, slug, codeblock, setCodeblock, parentProperties } = props;

  const { oneOf, propertyRestrictions } = getPropertiesRestrictions(schema);
  const [selectedOneOf, setSelectedOneOf] = useState<PropertyRestrictions | undefined>(
    oneOf.length > 0 ? oneOf[0] : undefined,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();
  const href = `${router.pathname}#${slug}`;
  const newParentProperties: CodeProperties[] = useMemo(
    () => getParentProperties(parentProperties, schema, title),
    [parentProperties, schema, title],
  );

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
    if (router.asPath.includes(href)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [href, router.asPath]);

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
                <MinusSmIcon className="inline h-4 w-auto pr-1 text-slate-700 dark:text-sky-100" />
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

          <Tag
            schema={schema}
            className="text-slate-700 dark:text-slate-400 [&>*]:py-0.5"
            spanClassName="rounded-md p-1 text-left text-sm font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:text-slate-400 dark:ring-inset dark:ring-white/5"
          />
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

interface DescriptionProps {
  description?: string;
  className?: string;
}

function Description(props: DescriptionProps): JSX.Element | null {
  const { description, className } = props;

  if (!description) {
    return null;
  }

  return (
    <ReactMarkdown
      className={clsx(
        className,
        'prose prose-slate dark:prose-invert max-w-none dark:text-slate-400',
        // headings
        'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
        // lead
        'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
        // links
        'prose-a:font-semibold dark:prose-a:text-sky-400',
        // link underline
        'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)]',
        // pre
        'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
        // hr
        'dark:prose-hr:border-slate-800',
      )}
      remarkPlugins={[remarkGfm]}
      components={{
        // Copied from example https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
        // eslint-disable-next-line react/no-unstable-nested-components
        code({ inline, className: codeClassName, children, ...rest }): JSX.Element {
          const match = /language-(\w+)/.exec(codeClassName || '');
          return !inline && match ? (
            <Fence language={match[1] as Language}>{String(children).replace(/\n$/, '')}</Fence>
          ) : (
            <code className={codeClassName} {...rest}>
              {children}
            </code>
          );
        },
      }}
    >
      {description}
    </ReactMarkdown>
  );
}

interface PanelProps {
  schema: JSONSchema7;
  selectedAllOf?: PropertyRestrictions;
  selectedAnyOf?: PropertyRestrictions;
  selectedOneOf?: PropertyRestrictions;
  propertyRestrictions?: string[];
  slug: string;
  codeblock: Record<string, unknown>;
  setCodeblock: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  parentProperties: CodeProperties[];
}

function Panel(props: PanelProps): JSX.Element | null {
  const { schema, ...rest } = props;

  if (schema.type === 'object') {
    return (
      <div className="ml-2 space-y-2 border-l border-white hover:border-slate-200 dark:border-slate-900 dark:hover:border-slate-800">
        <JsonSchemaViewer schema={schema} {...rest} className="pl-4" />
      </div>
    );
  }

  if (
    schema.type === 'array' &&
    // Array should only contain one type of an object
    !Array.isArray(schema.items) &&
    schema.items &&
    typeof schema.items !== 'boolean'
  ) {
    return (
      <div className="ml-2 space-y-2 border-l border-white hover:border-slate-200 dark:border-slate-900 dark:hover:border-slate-800">
        <JsonSchemaViewer schema={schema.items} {...rest} className="pl-4" />
      </div>
    );
  }

  return null;
}

interface DropdownProps {
  propertyRestrictions: PropertyRestrictions[];
  selectedPropertyRestriction?: PropertyRestrictions;
  setSelectedPropertyRestriction: React.Dispatch<
  React.SetStateAction<PropertyRestrictions | undefined>
  >;
  dropdownText: string;
  className?: string;
}

function Dropdown(props: DropdownProps): JSX.Element | null {
  const {
    className,
    dropdownText,
    propertyRestrictions,
    selectedPropertyRestriction,
    setSelectedPropertyRestriction,
  } = props;

  if (propertyRestrictions.length === 0) {
    return null;
  }

  return (
    <Listbox
      as="div"
      className={className}
      value={selectedPropertyRestriction}
      onChange={setSelectedPropertyRestriction}
    >
      <div className="relative">
        <Listbox.Label className="sr-only">{dropdownText}</Listbox.Label>
        <div className="flex items-center">
          <Listbox.Button className="flex h-6 w-auto items-center justify-between rounded-lg text-left text-sm font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:text-slate-400 dark:ring-inset dark:ring-white/5">
            <span className="block truncate pl-2 pr-7 text-slate-700 dark:text-sky-100">
              {dropdownText}: <span>{selectedPropertyRestriction?.name ?? ''}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-slate-700 dark:text-sky-100"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>

        <Listbox.Options className="absolute left-1/2 z-10 mt-3 w-36 -translate-x-1/2 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
          {propertyRestrictions.map((value) => (
            <Listbox.Option
              key={value.name}
              value={value}
              className={({ active }): string =>
                clsx('flex cursor-pointer select-none items-center rounded-[0.625rem] p-1', {
                  'text-devfile': value.name === selectedPropertyRestriction?.name,
                  'text-slate-900 dark:text-white':
                    active && value.name !== selectedPropertyRestriction?.name,
                  'text-slate-700 dark:text-slate-400':
                    !active && value.name !== selectedPropertyRestriction?.name,
                  'bg-slate-100 dark:bg-slate-900/40': active,
                })
              }
            >
              <div className="ml-1">{value.name}</div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

interface TagProps {
  schema: JSONSchema7;
  className?: string;
  spanClassName?: string;
}

function Tag(props: TagProps): JSX.Element {
  const { className, spanClassName, schema } = props;

  return (
    <div className={className}>
      {schema.default && (
        <div>
          Default: <span className={spanClassName}>{String(schema.default)}</span>
        </div>
      )}
      {schema.multipleOf && (
        <div>
          Multiple of: <span className={spanClassName}>{schema.multipleOf}</span>
        </div>
      )}
      {schema.maximum && (
        <div>
          <span className={spanClassName}>{`<= ${schema.maximum}`}</span>
        </div>
      )}
      {schema.exclusiveMaximum && (
        <div>
          <span className={spanClassName}>{`< ${schema.exclusiveMaximum}`}</span>
        </div>
      )}
      {schema.minimum && (
        <div>
          <span className={spanClassName}>{`>= ${schema.minimum}`}</span>
        </div>
      )}
      {schema.exclusiveMinimum && (
        <div>
          <span className={spanClassName}>{`> ${schema.exclusiveMinimum}`}</span>
        </div>
      )}
      {schema.maxLength && (
        <div>
          <span className={spanClassName}>{`<= ${schema.maxLength} characters`}</span>
        </div>
      )}
      {schema.minLength && (
        <div>
          <span className={spanClassName}>{`>= ${schema.minLength} characters`}</span>
        </div>
      )}
      {schema.pattern && (
        <div>
          Match pattern: <span className={spanClassName}>{schema.pattern}</span>
        </div>
      )}
      {schema.enum && (
        <div>
          Allowed values:{' '}
          {schema.enum.map((e, eIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={eIndex} className="pr-1">
              <span className="rounded-md bg-slate-800 p-0.5">{String(e)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function getType(schema: JSONSchema7): string {
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

function hasChildren(schema: JSONSchema7): boolean {
  if (!Array.isArray(schema.items) && schema.items && typeof schema.items !== 'boolean') {
    return !!schema.items.properties;
  }
  return !!schema.properties;
}

function propertiesReducer(
  prev: PropertyRestrictions[],
  curr: JSONSchema7Definition,
): PropertyRestrictions[] {
  if (typeof curr !== 'boolean' && curr.required) {
    return [...prev, { name: curr.required[0], values: curr.required }];
  }

  return prev;
}

interface PropertyRestrictions {
  name: string;
  values: string[];
}

interface GetPropertiesRestrictions {
  allOf: PropertyRestrictions[];
  anyOf: PropertyRestrictions[];
  oneOf: PropertyRestrictions[];
  propertyRestrictions: string[];
}

function getPropertiesRestrictions(schema: JSONSchema7): GetPropertiesRestrictions {
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

interface CodeProperty {
  title: string;
  type: string;
  isEnum: boolean;
}

interface CodeProperties {
  mainProperty?: CodeProperty;
  siblingProperties: (CodeProperty | null)[];
}

function getCode(properties: CodeProperties[]): Record<string, unknown> {
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

function addCode(
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

function getParentProperties(
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

export default JsonSchemaViewer;

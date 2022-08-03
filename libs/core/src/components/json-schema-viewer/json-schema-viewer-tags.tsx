import type { JSONSchema7 } from 'json-schema';
import { Prose } from '../prose/prose';

export interface JsonSchemaViewerTagsProps {
  schema: JSONSchema7;
  className?: string;
}

export function JsonSchemaViewerTags(props: JsonSchemaViewerTagsProps): JSX.Element {
  const { className, schema } = props;

  return (
    <Prose className={className}>
      {schema.default && (
        <div>
          Default: <code>{String(schema.default)}</code>
        </div>
      )}
      {schema.multipleOf && (
        <div>
          Multiple of: <code>{schema.multipleOf}</code>
        </div>
      )}
      {schema.maximum && (
        <div>
          <code>{`<= ${schema.maximum}`}</code>
        </div>
      )}
      {schema.exclusiveMaximum && (
        <div>
          <code>{`< ${schema.exclusiveMaximum}`}</code>
        </div>
      )}
      {schema.minimum && (
        <div>
          <code>{`>= ${schema.minimum}`}</code>
        </div>
      )}
      {schema.exclusiveMinimum && (
        <div>
          <code>{`> ${schema.exclusiveMinimum}`}</code>
        </div>
      )}
      {schema.maxLength && (
        <div>
          <code>{`<= ${schema.maxLength} characters`}</code>
        </div>
      )}
      {schema.minLength && (
        <div>
          <code>{`>= ${schema.minLength} characters`}</code>
        </div>
      )}
      {schema.pattern && (
        <div>
          Match pattern: <code>{schema.pattern}</code>
        </div>
      )}
      {schema.enum && (
        <div>
          Allowed values:{' '}
          {schema.enum.map((e, eIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={eIndex} className="pr-1">
              <code className="rounded-md bg-slate-800 p-0.5">{String(e)}</code>
            </span>
          ))}
        </div>
      )}
    </Prose>
  );
}

export default JsonSchemaViewerTags;

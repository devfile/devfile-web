import type { JSONSchema7 } from 'json-schema';

export interface JsonSchemaViewerTagsProps {
  schema: JSONSchema7;
  className?: string;
  spanClassName?: string;
}

export function JsonSchemaViewerTags(props: JsonSchemaViewerTagsProps): JSX.Element {
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

export default JsonSchemaViewerTags;

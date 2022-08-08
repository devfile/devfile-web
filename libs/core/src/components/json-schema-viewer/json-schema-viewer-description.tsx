import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Language } from '@schultzp2020/prism-react-renderer';
import { Fence } from '../fence/fence';
import { Prose } from '../prose/prose';

export interface JsonSchemaViewerDescriptionProps {
  description?: string;
  className?: string;
}

export function JsonSchemaViewerDescription(
  props: JsonSchemaViewerDescriptionProps,
): JSX.Element | null {
  const { description, className } = props;

  if (!description) {
    return null;
  }

  return (
    <Prose className={className}>
      <ReactMarkdown
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
    </Prose>
  );
}

export default JsonSchemaViewerDescription;

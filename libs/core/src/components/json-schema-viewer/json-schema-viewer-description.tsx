/**
 * Copyright Red Hat
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

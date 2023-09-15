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

import { Fragment, useState, useCallback, useMemo } from 'react';
import Highlight, { defaultProps } from '@schultzp2020/prism-react-renderer';
import clsx from 'clsx';
import { ClipboardDocumentCheckIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useCopyToClipboard } from 'usehooks-ts';
import type { Language } from '@schultzp2020/prism-react-renderer';
import { useNavigation } from '../../hooks';

export interface FenceProps {
  children: string;
  language: Language;
  title?: string;
  filename?: string;
}

export function Fence(props: FenceProps): JSX.Element {
  const { children, language, title, filename } = props;

  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { selectedVersion } = useNavigation();

  const onClick = useCallback(() => {
    setIsCopied(true);
    copy(children.trimEnd()).catch(() => {});

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [children, copy]);

  const version = useMemo(() => selectedVersion.replace(/-.*$/, ''), [selectedVersion]);

  return (
    <>
      {title && <h4>{title}</h4>}
      <Highlight
        {...defaultProps}
        code={children.replace(/schemaVersion: <version>/, `schemaVersion: ${version}`).trimEnd()}
        language={language}
        theme={undefined}
      >
        {({ className, style, tokens, getTokenProps }): JSX.Element => (
          <div className="not-prose group relative rounded-xl bg-slate-900 shadow-lg dark:bg-slate-800/60 dark:shadow-none dark:ring-1 dark:ring-slate-300/10">
            <button
              type="button"
              onClick={(): (() => void) => onClick()}
              className={clsx(
                isCopied && 'border border-green-600',
                'absolute top-2 right-2 hidden items-center justify-center rounded-lg border border-slate-800 bg-slate-700 shadow-md ring-inset ring-white/5 hover:bg-slate-600 group-hover:flex',
              )}
            >
              {isCopied ? (
                <CheckIcon className="h-8 w-auto p-1 text-green-600" />
              ) : (
                <ClipboardDocumentCheckIcon className="h-8 w-auto p-1 text-slate-400" />
              )}
            </button>
            {isCopied && (
              <div className="absolute top-2 right-11 hidden items-center group-hover:flex">
                <div className=" rounded-md bg-slate-700 p-1 text-sm tracking-tight text-sky-100">
                  Copied!
                </div>
                <div className="h-0 w-0 border-t-[6px] border-l-8 border-b-[6px] border-t-transparent border-l-slate-700 border-b-transparent" />
              </div>
            )}

            {filename && (
              <div className="text-devfile border-devfile bg-slate-800/05 w-fit rounded-br border-b border-r py-2 px-4 text-xs tracking-tighter">
                {filename}
              </div>
            )}

            <pre className={clsx(className, 'flex overflow-x-auto px-4 py-3')} style={style}>
              <code>
                {tokens.map((line, lineIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={lineIndex}>
                    {line.map((token, tokenIndex) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                    {'\n'}
                  </Fragment>
                ))}
              </code>
            </pre>
          </div>
        )}
      </Highlight>
    </>
  );
}

export default Fence;

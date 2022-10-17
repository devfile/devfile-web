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

import { Fragment, useState, useCallback } from 'react';
import Highlight, { defaultProps } from '@schultzp2020/prism-react-renderer';
import clsx from 'clsx';
import { useCopyToClipboard } from 'usehooks-ts';
import { ClipboardDocumentCheckIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useAnalytics } from '../../hooks';

export interface DevfileCodeblockProps {
  className?: string;
  devfileName: string;
  devfileYaml: string;
}

export function DevfileCodeblock(props: DevfileCodeblockProps): JSX.Element {
  const { className, devfileYaml, devfileName } = props;

  const { dispatch } = useAnalytics();
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setIsCopied(true);
    copy(devfileYaml.trimEnd()).catch(() => {});

    dispatch('devfile-copied', { devfileName }).catch(() => {});

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copy, devfileYaml, dispatch, devfileName]);

  return (
    <div className={className}>
      <div className="border-b border-slate-200 pb-2 text-lg font-medium leading-8 text-slate-700 dark:border-slate-700 dark:text-sky-100">
        Devfile
      </div>
      <div className="relative pt-6">
        <div className="group flex max-h-screen items-start overflow-y-auto rounded bg-slate-900 px-3 text-sm dark:rounded-none dark:bg-inherit">
          <div
            aria-hidden="true"
            className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
          >
            {Array.from({
              length: devfileYaml.split('\n').length,
            }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                {(index + 1).toString().padStart(2, '0')}
                <br />
              </Fragment>
            ))}
          </div>
          <button
            type="button"
            onClick={(): (() => void) => onClick()}
            className={clsx(
              isCopied && 'border border-green-600',
              'absolute top-6 right-6 hidden items-center justify-center rounded-lg border border-slate-800 bg-slate-700 shadow-md ring-inset ring-white/5 hover:bg-slate-600 group-hover:flex',
            )}
          >
            {isCopied ? (
              <CheckIcon className="h-8 w-auto p-1 text-green-600" />
            ) : (
              <ClipboardDocumentCheckIcon className="h-8 w-auto p-1 text-slate-400" />
            )}
          </button>
          {isCopied && (
            <div className="absolute top-6 right-[3.75rem] hidden items-center group-hover:flex">
              <div className=" rounded-md bg-slate-700 p-1 text-sm tracking-tight text-sky-100">
                Copied!
              </div>
              <div className="h-0 w-0 border-t-[6px] border-l-8 border-b-[6px] border-t-transparent border-l-slate-700 border-b-transparent" />
            </div>
          )}
          <Highlight {...defaultProps} code={devfileYaml} language="yaml" theme={undefined}>
            {({ className: _className, style, tokens, getTokenProps }): JSX.Element => (
              <pre className={clsx(_className, 'flex overflow-x-auto px-4')} style={style}>
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
            )}
          </Highlight>
        </div>
      </div>
    </div>
  );
}

export default DevfileCodeblock;

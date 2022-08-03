import { Fragment, useState, useCallback } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import clsx from 'clsx';
import { ClipboardCopyIcon, CheckIcon } from '@heroicons/react/outline';
import { useCopyToClipboard } from 'usehooks-ts';
import type { Language } from 'prism-react-renderer';

export interface FenceProps {
  children: string;
  language: Language;
  title?: string;
  filename?: string;
}

export function Fence(props: FenceProps): JSX.Element {
  const { children, language, title, filename } = props;

  // the first value is not needed
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setIsCopied(true);
    copy(children.trimEnd()).catch(() => {});

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [children, copy]);

  return (
    <>
      {title && <h4>{title}</h4>}
      <Highlight {...defaultProps} code={children.trimEnd()} language={language} theme={undefined}>
        {({ className, style, tokens, getTokenProps }): JSX.Element => (
          <pre className={clsx(className, 'not-prose group relative p-0')} style={style}>
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
                <ClipboardCopyIcon className="h-8 w-auto p-1 text-slate-400" />
              )}
            </button>
            {isCopied && (
              <div className="absolute top-2 right-11 hidden items-center group-hover:flex">
                <div className=" rounded-md bg-slate-700 p-1 tracking-tight text-sky-100">
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

            <div className="px-4 py-3">
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
            </div>
          </pre>
        )}
      </Highlight>
    </>
  );
}

export default Fence;

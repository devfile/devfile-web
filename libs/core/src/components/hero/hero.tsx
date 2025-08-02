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

import { Fragment } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import type { SVGProps } from 'react';
import Highlight, { defaultProps } from '@schultzp2020/prism-react-renderer';
import type { Language } from '@schultzp2020/prism-react-renderer';
import { Button } from '../button/button';
import { useLinks } from '../../hooks';
import { HeroBackground } from '../hero-background/hero-background';
import blurCyanImage from '../../images/blur-cyan.png';
import blurIndigoImage from '../../images/blur-indigo.png';

const codeLanguage: Language = 'yaml';
const code = `schemaVersion: 2.2.0
metadata:
  name: go
  language: go
components:
  - container:
      endpoints:
        - name: http
          targetPort: 8080
      image: quay.io/devfile/golang:latest
      memoryLimit: 1024Mi
      mountSources: true
    name: runtime`;

const tabs = [
  { name: 'devfile.yaml', isActive: true },
  { name: 'main.go', isActive: false },
];

function TrafficLightsIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  );
}

export function Hero(): JSX.Element {
  const { headerNavigation } = useLinks();

  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-16 dark:mt-[-12rem] dark:pb-32 dark:pt-[12rem] ">
      <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
        <div className="lg:max-w-8xl mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="absolute bottom-full right-full -mr-72 -mb-56 opacity-50">
              <Image src={blurCyanImage} alt="" width={530} height={530} unoptimized priority />
            </div>
            <div className="relative">
              <p className="font-display via-devfile inline bg-gradient-to-r from-indigo-200 to-indigo-200 bg-clip-text text-5xl tracking-tight text-transparent">
                Simplify and accelerate your workflow.
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                An open standard for containerized development environments.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button
                  href={headerNavigation.find((el) => el.name === 'Get Started')?.href ?? '/docs'}
                >
                  Get started
                </Button>
                <Button
                  href={
                    headerNavigation.find((el) => el.name === 'Github')?.href ??
                    'https://github.com/devfile/api'
                  }
                  variant="secondary"
                >
                  View on Github
                </Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:left-[calc(50%+14rem)] lg:right-0 lg:-top-32 lg:-bottom-32 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
              <div className="absolute -top-64 -right-64">
                <Image src={blurCyanImage} alt="" width={530} height={530} unoptimized priority />
              </div>
              <div className="absolute -bottom-40 -right-44">
                <Image src={blurIndigoImage} alt="" width={567} height={567} unoptimized priority />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                <div className="pl-4 pt-4">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx(
                          'flex h-6 rounded-full',
                          tab.isActive
                            ? 'bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300'
                            : 'text-slate-500',
                        )}
                      >
                        <div
                          className={clsx(
                            'flex items-center rounded-full px-2.5',
                            tab.isActive && 'bg-slate-800',
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-start px-1 text-sm">
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      {...defaultProps}
                      code={code}
                      language={codeLanguage}
                      theme={undefined}
                    >
                      {({ className, style, tokens, getLineProps, getTokenProps }): JSX.Element => (
                        <pre className={clsx(className, 'flex overflow-x-auto pb-6')} style={style}>
                          <code className="px-4">
                            {tokens.map((line, lineIndex) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <div key={lineIndex} {...getLineProps({ line })}>
                                {line.map((token, tokenIndex) => (
                                  // eslint-disable-next-line react/no-array-index-key
                                  <span key={tokenIndex} {...getTokenProps({ token })} />
                                ))}
                              </div>
                            ))}
                          </code>
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

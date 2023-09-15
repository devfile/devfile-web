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

import type { PropsWithChildren } from 'react';
import Head from 'next/head';

export interface MetaProps {
  title?: string;
  keywords?: string;
  description?: string;
}

// @ts-ignore
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function Meta(props: PropsWithChildren<MetaProps>): JSX.Element {
  const { title, keywords, description, children } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />

      <meta charSet="utf8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
      />
      <meta name="theme-color" content="#151515" />
      <link rel="icon" href={`${basePath}/favicon.ico`} />
      {children}
    </Head>
  );
}

export default Meta;

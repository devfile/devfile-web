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

import type { GetStaticPaths, GetStaticProps } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

export function Index(): JSX.Element {
  return <meta httpEquiv="refresh" content={`0; url=${basePath || '/'}`} />;
}

export const getStaticProps: GetStaticProps = () => ({
  props: {},
  revalidate: process.env.REVALIDATE_TIME ? Number.parseInt(process.env.REVALIDATE_TIME, 10) : 15,
});

export const getStaticPaths: GetStaticPaths = () =>
  // Return empty paths because we don't want to generate anything on build
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  ({
    paths: [],
    fallback: 'blocking',
  });

export default Index;

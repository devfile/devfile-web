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

const path = require('node:path');
const withNx = require('@nrwl/next/plugins/with-nx');
const withMarkdoc = require('@markdoc/next.js');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// NEXT_PUBLIC_BASE_PATH does not update the font urls in /styles/fonts.css.
// Besides /devfile-web, the urls must be updated if NEXT_PUBLIC_BASE_PATH is changed.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'tsx', 'md'],
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  nx: {
    svgr: false,
  },
};

const plugins = [withBundleAnalyzer, withMarkdoc(), withNx];

module.exports = plugins.reduce((config, plugin) => plugin(config), nextConfig);

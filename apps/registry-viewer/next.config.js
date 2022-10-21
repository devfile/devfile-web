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

const path = require('path');
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// fonts in /styles/fonts.css have hard coded urls and must be changed if NEXT_PUBLIC_BASE_PATH changes besides /devfile-web
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

// Invalid next.config.js options detected: https://github.com/vercel/next.js/issues/39161
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  basePath,
  assetPrefix: basePath,
  pageExtensions: ['js', 'jsx', 'tsx', 'md'],
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    newNextLinkBehavior: true,
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  nx: {
    svgr: false,
  },
};

module.exports = withPlugins([withBundleAnalyzer, withNx], nextConfig);

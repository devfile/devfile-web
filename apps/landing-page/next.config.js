const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withMarkdoc = require('@markdoc/next.js');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  pageExtensions: ['js', 'jsx', 'tsx', 'md'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  assetPrefix: './',
  experimental: {
    newNextLinkBehavior: true,
  },
};

module.exports = withPlugins([withBundleAnalyzer, withMarkdoc(), withNx], nextConfig);

const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withMarkdoc = require('@markdoc/next.js');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// fonts in /styles/fonts.css have hard coded urls and must be changed if NEXT_PUBLIC_BASE_PATH changes besides /devfile-web
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  basePath,
  assetPrefix: basePath,
  pageExtensions: ['js', 'jsx', 'tsx', 'md'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  experimental: {
    newNextLinkBehavior: true,
  },
};

module.exports = withPlugins([withBundleAnalyzer, withMarkdoc(), withNx], nextConfig);

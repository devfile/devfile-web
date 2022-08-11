const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withMarkdoc = require('@markdoc/next.js');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
  async rewrites() {
    return [
      {
        source: '/fonts/:path*',
        destination: `${basePath}/fonts/:path*`,
      },
    ];
  },
};

module.exports = withPlugins([withBundleAnalyzer, withMarkdoc(), withNx], nextConfig);

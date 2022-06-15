// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  nx: {
    svgr: true,
  },
  swcMinify: true,
  basePath: process.env.NEXT_BASE_PATH || '',
  publicRuntimeConfig: {
    analyticsWriteKey: process.env.ANALYTICS_WRITE_KEY || '',
    segmentClientId: 'landing-page',
    basePath: process.env.NEXT_BASE_PATH || '',
  },
};

module.exports = withNx(nextConfig);

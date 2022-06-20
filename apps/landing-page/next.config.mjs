import withNx from '@nrwl/next/plugins/with-nx.js';
import withPlugins from 'next-compose-plugins';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeHighlight from 'rehype-highlight';

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
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
            remarkPlugins: [remarkFrontmatter],
            rehypePlugins: [rehypeHighlight],
          },
        },
      ],
    });

    return config;
  },
  reactStrictMode: true,
  pageExtensions: ['tsx', 'md', 'mdx'],
  images: {
    loader: 'imgix',
    path: 'https://images.unsplash.com/',
  },
};

export default withPlugins([withNx], nextConfig);

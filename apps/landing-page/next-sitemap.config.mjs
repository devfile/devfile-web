/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://devfile.io/',
  generateRobotsTxt: true,
  sourceDir: 'dist/apps/landing-page/.next',
  outDir: 'dist/apps/landing-page/public',
};

export default config;

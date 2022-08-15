import Head from 'next/head';

export interface LandingPageMetaProps {
  title?: string;
  keywords?: string;
  description?: string;
}

// @ts-ignore
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function LandingPageMeta(props: LandingPageMetaProps): JSX.Element {
  const { title, keywords, description } = props;

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
      <link rel="preconnect" href="https://FCRPEMIKYK-dsn.algolia.net" crossOrigin="true" />
    </Head>
  );
}

LandingPageMeta.defaultProps = {
  title: 'Devfile',
  keywords: 'Devfile, OpenShift, Kubernetes',
  description: 'Devfile Landing Page',
};

export default LandingPageMeta;

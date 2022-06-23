import React from 'react';

export interface LandingPageMetaProps {
  title?: string;
  keywords?: string;
  description?: string;
}
export function LandingPageMeta(props: LandingPageMetaProps): JSX.Element {
  const { title, keywords, description } = props;

  return (
    <head>
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
    </head>
  );
}

LandingPageMeta.defaultProps = {
  title: 'Devfile',
  keywords: 'Devfile, OpenShift, Kubernetes',
  description: 'Devfile Landing Page',
};

export default LandingPageMeta;

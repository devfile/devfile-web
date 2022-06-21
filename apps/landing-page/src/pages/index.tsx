import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '../components/HomepageFeatures';
import { Header } from '../../node_modules/@devfile-web/core/src/components/header/header';
import { CncfBanner } from '../../node_modules/@devfile-web/core/src/components/cncf-banner/cncf-banner';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="bg-blue-600">
      <div className="container mx-auto py-24 text-center">
        <h1 className="text-4xl font-bold text-white">{siteConfig.title}</h1>
        <p className="py-6 text-xl text-white">{siteConfig.tagline}</p>

        <div className="py-10">
          <Link className="rounded-md bg-white px-4 py-2 text-gray-500" to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Header Link={Link} />
      <CncfBanner />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

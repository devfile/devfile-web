import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  AnalyticsWrapper,
  LandingPageMeta,
  MonorepoProvider,
  Header,
  CncfBanner,
  IntroSection,
  KeyFeaturesSection,
  ValuePropositionSection,
  Footer,
} from '@devfile-web/core';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();

  return (
    <MonorepoProvider repo="landing-page" Link={Link}>
      <>
        <LandingPageMeta />
        <Header />
        <CncfBanner />
        <main>
          <IntroSection />
          <ValuePropositionSection />
          <KeyFeaturesSection />
        </main>
        <Footer />
      </>
    </MonorepoProvider>
  );
}

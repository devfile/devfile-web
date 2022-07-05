import { AppProps } from 'next/app';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import {
  AnalyticsProvider,
  AnalyticsWrapper,
  LandingPageMeta,
  Header,
  Footer,
} from '@devfile-web/core';
import type { GetConfig } from '@devfile-web/core';
import '../styles/tailwind.css';

const { publicRuntimeConfig } = getConfig() as GetConfig;

function LandingPage({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  return (
    <AnalyticsProvider writeKey={publicRuntimeConfig.analyticsWriteKey}>
      <AnalyticsWrapper path={router.asPath} client={publicRuntimeConfig.segmentClientId}>
        <div className="flex h-screen flex-col justify-between">
          <LandingPageMeta />
          <div className="grow">
            <Header />
            <main className="">
              <Component {...pageProps} />
            </main>
          </div>
          <Footer />
        </div>
      </AnalyticsWrapper>
    </AnalyticsProvider>
  );
}

export default LandingPage;

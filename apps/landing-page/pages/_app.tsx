import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import {
  LandingPageMeta,
  AnalyticsProvider,
  useAnalytics,
  getAnonymousId,
  getUserRegion,
  GetConfig,
} from '@devfile-web/ui';
import './styles.css';

const { publicRuntimeConfig } = getConfig() as GetConfig;

function LandingPage(props: AppProps): JSX.Element {
  return (
    <>
      <LandingPageMeta />
      <div>
        <main>
          <AnalyticsProvider writeKey={publicRuntimeConfig.analyticsWriteKey}>
            <AnalyticsWrapper {...props} />
          </AnalyticsProvider>
        </main>
      </div>
    </>
  );
}

function AnalyticsWrapper(props: AppProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, pageProps } = props;

  const router = useRouter();
  const { analytics } = useAnalytics();

  useEffect(() => {
    const sendAnalytics = async (): Promise<void> => {
      const region = getUserRegion(router.locale);
      const anonymousId = await getAnonymousId(analytics);

      await analytics.identify(
        anonymousId,
        {
          id: anonymousId,
        },
        {
          context: { ip: '0.0.0.0', location: { country: region } },
        },
      );

      await analytics.track(
        router.asPath,
        { client: publicRuntimeConfig.segmentClientId },
        {
          context: { ip: '0.0.0.0', location: { country: region } },
          userId: anonymousId,
        },
      );
    };

    sendAnalytics().catch(() => {});
  }, [analytics, router.asPath, router.locale]);

  return <Component {...pageProps} />;
}

export default LandingPage;

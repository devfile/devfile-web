import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useAnalytics, getAnonymousId } from '../../hooks';
import { getUserRegion } from '../../functions';
import type { GetConfig } from '../../types';

const { publicRuntimeConfig } = getConfig() as GetConfig;

export function AnalyticsWrapper(props: AppProps): JSX.Element {
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

export default AnalyticsWrapper;

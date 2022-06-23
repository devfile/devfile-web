import { useEffect } from 'react';
import { useAnalytics, getAnonymousId } from '../../hooks';
import { getUserRegion } from '../../functions';

export interface AnalyticsWrapperProps {
  children: JSX.Element;
  client: string;
  path: string;
}

export function AnalyticsWrapper(props: AnalyticsWrapperProps): JSX.Element {
  const { children, client, path } = props;

  const { analytics } = useAnalytics();

  useEffect(() => {
    const sendAnalytics = async (): Promise<void> => {
      const region = getUserRegion();
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
        path,
        { client },
        {
          context: { ip: '0.0.0.0', location: { country: region } },
          userId: anonymousId,
        },
      );
    };

    sendAnalytics().catch(() => {});
  }, [analytics, client, path]);

  return children;
}

export default AnalyticsWrapper;

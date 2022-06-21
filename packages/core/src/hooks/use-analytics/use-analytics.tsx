import { createContext, useMemo, useContext } from 'react';
import { AnalyticsBrowser } from '@segment/analytics-next';
import type { ID } from '@segment/analytics-next';

export interface AnalyticsProviderProps {
  children: JSX.Element;
  writeKey: string;
}

export interface UseAnalytics {
  analytics: AnalyticsBrowser;
}

const AnalyticsContext = createContext<AnalyticsBrowser | undefined>(undefined);

export function AnalyticsProvider({ children, writeKey }: AnalyticsProviderProps): JSX.Element {
  const analytics = useMemo(() => AnalyticsBrowser.load({ writeKey }), [writeKey]);
  return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
}

export async function getAnonymousId(analytics: AnalyticsBrowser): Promise<ID> {
  const [analyticsResponse] = await analytics;
  const anonymousId = analyticsResponse.user().anonymousId();

  return anonymousId;
}

export const useAnalytics = (): UseAnalytics => {
  const analytics = useContext(AnalyticsContext);
  if (!analytics) {
    throw new Error('Context used outside of its Provider!');
  }

  return { analytics };
};

export default useAnalytics;

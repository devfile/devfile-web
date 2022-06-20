import { AppProps } from 'next/app';
import getConfig from 'next/config';
import {
  AnalyticsProvider,
  AnalyticsWrapper,
  DocsLayout,
  Footer,
  GetConfig,
  Header,
  LandingPageMeta,
} from '@devfile-web/ui';
import { useRouter } from 'next/router';
import './styles.css';

const { publicRuntimeConfig } = getConfig() as GetConfig;

function LandingPage(props: AppProps): JSX.Element {
  const router = useRouter();

  if (router.asPath.startsWith('/docs')) {
    return (
      <div className="flex h-screen flex-col justify-between">
        <div className="grow">
          <LandingPageMeta />
          <Header />
          <main className="h-full">
            <DocsLayout>
              <AnalyticsProvider writeKey={publicRuntimeConfig.analyticsWriteKey}>
                <AnalyticsWrapper {...props} />
              </AnalyticsProvider>
            </DocsLayout>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col justify-between">
      <div>
        <LandingPageMeta />
        <Header />
        <main>
          <AnalyticsProvider writeKey={publicRuntimeConfig.analyticsWriteKey}>
            <AnalyticsWrapper {...props} />
          </AnalyticsProvider>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;

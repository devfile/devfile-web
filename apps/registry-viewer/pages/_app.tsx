import { AppProps } from 'next/app';
import 'focus-visible';
import { AnalyticsProvider, LinksProvider, Header, Footer } from '@devfile-web/core';
import '../styles/tailwind.css';
import { headerNavigation, footerNavigation } from '../navigation';

const analyticsConfig = {
  writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY ?? '',
  client: 'registry-viewer',
};

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AnalyticsProvider {...analyticsConfig}>
      <LinksProvider headerNavigation={headerNavigation} footerNavigation={footerNavigation}>
        <div className="flex h-screen min-w-[300px] flex-col justify-between bg-slate-50 dark:bg-slate-900">
          <div className="grow">
            <Header websiteName="Devfile Registry" />
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </LinksProvider>
    </AnalyticsProvider>
  );
}

export default CustomApp;

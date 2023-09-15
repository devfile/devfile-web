/**
 * Copyright Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { AppProps } from 'next/app';
import 'focus-visible';
import env from '@beam-australia/react-env';
import { AnalyticsProvider, LinksProvider, Header, Footer, RegistryMeta } from '@devfile-web/core';
import '../styles/tailwind.css';
import { headerNavigation, footerNavigation } from '../navigation';

const analyticsConfig = {
  writeKey: env('ANALYTICS_WRITE_KEY'),
  client: 'registry-viewer',
};

const websiteName = 'Devfile Registry';

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AnalyticsProvider {...analyticsConfig}>
      <LinksProvider headerNavigation={headerNavigation} footerNavigation={footerNavigation}>
        <div className="flex h-screen min-w-[300px] flex-col justify-between bg-slate-50 dark:bg-slate-900">
          <div className="grow">
            <RegistryMeta />
            <Header websiteName={websiteName} />
            <Component {...pageProps} />
          </div>
          <Footer websiteName={websiteName} />
        </div>
      </LinksProvider>
    </AnalyticsProvider>
  );
}

export default CustomApp;

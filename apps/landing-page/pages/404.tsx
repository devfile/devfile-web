/**
 * Copyright 2022 Red Hat, Inc.
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

import { LandingPageMeta, Custom404 as Page404 } from '@devfile-web/core';
import { defaultVersion, docVersions } from '@devfile-web/docs';
import { useRouter } from 'next/router';
import { custom404Navigation, redirects } from '../navigation';

export function Custom404(): JSX.Element {
  const router = useRouter();

  const redirectLinks = redirects.map((redirect) => {
    const match = router.asPath.match(redirect.from);
    const version =
      docVersions.find((_version) => match && _version.includes(match[1])) || defaultVersion;
    return { isPage: !!match, href: redirect.to(version) };
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <LandingPageMeta title="404: Page not found">
        {redirectLinks.map(
          (link) =>
            link.isPage && (
              <meta key={link.href} httpEquiv="refresh" content={`0; url=${link.href}`} />
            ),
        )}
      </LandingPageMeta>

      <Page404 custom404Navigation={custom404Navigation} />
    </div>
  );
}

export default Custom404;

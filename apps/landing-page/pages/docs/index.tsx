import { LandingPageMeta } from '@devfile-web/core';
import { defaultVersion } from '@devfile-web/docs';
import { custom404Navigation } from '../../navigation';

export function Index(): JSX.Element {
  return (
    <LandingPageMeta title="404: Page not found">
      <meta
        httpEquiv="refresh"
        content={`0; url=${
          custom404Navigation.find((el) => el.name === 'Documentation').href ??
          `/docs/${defaultVersion}/what-is-a-devfile`
        }`}
      />
    </LandingPageMeta>
  );
}

export default Index;

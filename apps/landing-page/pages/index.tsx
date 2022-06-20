import {
  IntroSection,
  CncfBanner,
  ValuePropositionSection,
  KeyFeaturesSection,
} from '@devfile-web/ui';

export function Index(): JSX.Element {
  return (
    <>
      <CncfBanner />
      <IntroSection />
      <ValuePropositionSection />
      <KeyFeaturesSection />
    </>
  );
}

export default Index;

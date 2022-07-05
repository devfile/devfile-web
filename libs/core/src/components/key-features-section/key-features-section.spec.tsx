import { render } from '@testing-library/react';
import KeyFeaturesSection from './key-features-section';

describe('KeyFeaturesSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KeyFeaturesSection />);
    expect(baseElement).toBeTruthy();
  });
});

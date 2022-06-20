import { render } from '@testing-library/react';
import IntroSection from './intro-section';

describe('IntroSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IntroSection />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import LandingPageMeta from './landing-page-meta';

describe('LandingPageMeta', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPageMeta />);
    expect(baseElement).toBeTruthy();
  });
});

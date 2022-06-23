import { render } from '@testing-library/react';
import DevfileBanner from './devfile-banner';

describe('DevfileLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DevfileBanner />);
    expect(baseElement).toBeTruthy();
  });
});

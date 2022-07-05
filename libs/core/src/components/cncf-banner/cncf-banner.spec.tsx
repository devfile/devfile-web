import { render } from '@testing-library/react';
import CncfBanner from './cncf-banner';

describe('CncfBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CncfBanner />);
    expect(baseElement).toBeTruthy();
  });
});

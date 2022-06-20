import { render } from '@testing-library/react';
import DevfileLogo from './devfile-logo';

describe('DevfileLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DevfileLogo />);
    expect(baseElement).toBeTruthy();
  });
});

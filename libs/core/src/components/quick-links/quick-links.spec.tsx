import { render } from '@testing-library/react';
import QuickLinks from './quick-links';

describe('QuickLinks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuickLinks />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import LandingPageSearch from './landing-page-search';

describe('LandingPageSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPageSearch />);
    expect(baseElement).toBeTruthy();
  });
});

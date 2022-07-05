import { render } from '@testing-library/react';
import DevfileTitle from './devfile-title';

describe('DevfileLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DevfileTitle />);
    expect(baseElement).toBeTruthy();
  });
});

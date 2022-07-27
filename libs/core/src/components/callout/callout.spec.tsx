import { render } from '@testing-library/react';
import Callout from './callout';

describe('Callout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Callout />);
    expect(baseElement).toBeTruthy();
  });
});

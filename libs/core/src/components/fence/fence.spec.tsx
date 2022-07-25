import { render } from '@testing-library/react';
import Fence from './fence';

describe('Fence', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Fence />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import ThemeSelector from './theme-selector';

describe('ThemeSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeSelector />);
    expect(baseElement).toBeTruthy();
  });
});

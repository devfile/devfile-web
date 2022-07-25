import { render } from '@testing-library/react';
import HeroBackground from './hero-background';

describe('HeroBackground', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeroBackground />);
    expect(baseElement).toBeTruthy();
  });
});

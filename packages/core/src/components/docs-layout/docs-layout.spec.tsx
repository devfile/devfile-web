import { render } from '@testing-library/react';
import DocsLayout from './docs-layout';

describe('Docs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DocsLayout />);
    expect(baseElement).toBeTruthy();
  });
});

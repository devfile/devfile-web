import { render } from '@testing-library/react';
import ValuePropositionSection from './value-proposition-section';

describe('ValuePropositionSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ValuePropositionSection />);
    expect(baseElement).toBeTruthy();
  });
});

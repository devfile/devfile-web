import { render } from '@testing-library/react';
import VersionSelector from './version-selector';

describe('VersionSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VersionSelector />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import JsonSchemaViewer from './json-schema-viewer';

describe('JsonSchemaViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JsonSchemaViewer />);
    expect(baseElement).toBeTruthy();
  });
});

import { Story, Meta } from '@storybook/react';
import JsonSchemaViewer, { JsonSchemaViewerProps } from './json-schema-viewer';

export default {
  component: JsonSchemaViewer,
  title: 'JsonSchemaViewer',
} as Meta;

const Template: Story<JsonSchemaViewerProps> = (args) => <JsonSchemaViewer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

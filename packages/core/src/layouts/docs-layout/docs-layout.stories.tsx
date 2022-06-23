import { Story, Meta } from '@storybook/react';
import DocsLayout, { DocsProps } from './docs-layout';

export default {
  component: DocsLayout,
  title: 'Docs',
} as Meta;

const Template: Story<DocsProps> = (args) => <DocsLayout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

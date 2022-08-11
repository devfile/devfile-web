import { Story, Meta } from '@storybook/react';
import DocsLink, { DocsLinkProps } from './docs-link';

export default {
  component: DocsLink,
  title: 'VersionedLink',
} as Meta;

const Template: Story<DocsLinkProps> = (args) => <DocsLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

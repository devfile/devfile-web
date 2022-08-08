import { Story, Meta } from '@storybook/react';
import VersionedLink, { VersionedLinkProps } from './versioned-link';

export default {
  component: VersionedLink,
  title: 'VersionedLink',
} as Meta;

const Template: Story<VersionedLinkProps> = (args) => <VersionedLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

import { Story, Meta } from '@storybook/react';
import VersionSelector, { VersionSelectorProps } from './version-selector';

export default {
  component: VersionSelector,
  title: 'VersionSelector',
} as Meta;

const Template: Story<VersionSelectorProps> = (args) => <VersionSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

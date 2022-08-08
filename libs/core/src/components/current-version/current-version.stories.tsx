import { Story, Meta } from '@storybook/react';
import CurrentVersion, { CurrentVersionProps } from './current-version';

export default {
  component: CurrentVersion,
  title: 'CurrentVersion',
} as Meta;

const Template: Story<CurrentVersionProps> = (args) => <CurrentVersion {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

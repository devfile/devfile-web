import { Story, Meta } from '@storybook/react';
import DevfileHeader, { DevfileHeaderProps } from './devfile-header';

export default {
  component: DevfileHeader,
  title: 'DevfileHeader',
} as Meta;

const Template: Story<DevfileHeaderProps> = (args) => <DevfileHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

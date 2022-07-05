import { Story, Meta } from '@storybook/react';
import DevfileTitle, { DevfileTitleProps } from './devfile-title';

export default {
  component: DevfileTitle,
  title: 'DevfileLogo',
} as Meta;

const Template: Story<DevfileTitleProps> = (args) => <DevfileTitle {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

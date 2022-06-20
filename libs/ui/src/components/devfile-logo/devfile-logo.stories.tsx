import { Story, Meta } from '@storybook/react';
import DevfileLogo, { DevfileLogoProps } from './devfile-logo';

export default {
  component: DevfileLogo,
  title: 'DevfileLogo',
} as Meta;

const Template: Story<DevfileLogoProps> = (args) => <DevfileLogo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

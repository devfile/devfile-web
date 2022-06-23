import { Story, Meta } from '@storybook/react';
import DevfileBanner, { DevfileLogoProps } from './devfile-banner';

export default {
  component: DevfileBanner,
  title: 'DevfileLogo',
} as Meta;

const Template: Story<DevfileLogoProps> = (args) => <DevfileBanner {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

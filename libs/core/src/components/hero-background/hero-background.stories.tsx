import { Story, Meta } from '@storybook/react';
import HeroBackground, { HeroBackgroundProps } from './hero-background';

export default {
  component: HeroBackground,
  title: 'HeroBackground',
} as Meta;

const Template: Story<HeroBackgroundProps> = (args) => <HeroBackground {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

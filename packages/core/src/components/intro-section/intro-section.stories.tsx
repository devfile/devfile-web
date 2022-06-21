import { Story, Meta } from '@storybook/react';
import IntroSection, { IntroSectionProps } from './intro-section';

export default {
  component: IntroSection,
  title: 'IntroSection',
} as Meta;

const Template: Story<IntroSectionProps> = (args) => <IntroSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

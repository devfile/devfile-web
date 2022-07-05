import { Story, Meta } from '@storybook/react';
import KeyFeaturesSection, { KeyFeaturesSectionProps } from './key-features-section';

export default {
  component: KeyFeaturesSection,
  title: 'KeyFeaturesSection',
} as Meta;

const Template: Story<KeyFeaturesSectionProps> = (args) => <KeyFeaturesSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

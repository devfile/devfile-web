import { Story, Meta } from '@storybook/react';
import LandingPageSearch, { LandingPageSearchProps } from './landing-page-search';

export default {
  component: LandingPageSearch,
  title: 'LandingPageSearch',
} as Meta;

const Template: Story<LandingPageSearchProps> = (args) => <LandingPageSearch {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

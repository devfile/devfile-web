import { Story, Meta } from '@storybook/react';
import CncfBanner, { CncfBannerProps } from './cncf-banner';

export default {
  component: CncfBanner,
  title: 'CncfBanner',
} as Meta;

const Template: Story<CncfBannerProps> = (args) => <CncfBanner {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

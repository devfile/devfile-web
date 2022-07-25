import { Story, Meta } from '@storybook/react';
import MobileNavigation, { MobileNavigationProps } from './mobile-navigation';

export default {
  component: MobileNavigation,
  title: 'MobileNavigation',
} as Meta;

const Template: Story<MobileNavigationProps> = (args) => <MobileNavigation {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

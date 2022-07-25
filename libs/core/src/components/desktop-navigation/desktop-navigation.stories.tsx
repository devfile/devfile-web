import { Story, Meta } from '@storybook/react';
import DocsNavigation, { DesktopNavigationProps } from './desktop-navigation';

export default {
  component: DocsNavigation,
  title: 'Navigation',
} as Meta;

const Template: Story<DesktopNavigationProps> = (args) => <DocsNavigation {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

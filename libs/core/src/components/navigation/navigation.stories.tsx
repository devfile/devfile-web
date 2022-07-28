import { Story, Meta } from '@storybook/react';
import DocsNavigation, { NavigationProps } from './navigation';

export default {
  component: DocsNavigation,
  title: 'Navigation',
} as Meta;

const Template: Story<NavigationProps> = (args) => <DocsNavigation {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

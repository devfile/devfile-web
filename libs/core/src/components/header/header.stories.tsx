import { Story, Meta } from '@storybook/react';
import OldHeader, { HeaderProps } from './header';

export default {
  component: OldHeader,
  title: 'Header',
} as Meta;

const Template: Story<HeaderProps> = (args) => <OldHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

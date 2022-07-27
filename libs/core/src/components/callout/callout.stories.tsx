import { Story, Meta } from '@storybook/react';
import Callout, { CalloutProps } from './callout';

export default {
  component: Callout,
  title: 'Callout',
} as Meta;

const Template: Story<CalloutProps> = (args) => <Callout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

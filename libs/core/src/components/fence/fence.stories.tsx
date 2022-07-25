import { Story, Meta } from '@storybook/react';
import Fence, { FenceProps } from './fence';

export default {
  component: Fence,
  title: 'Fence',
} as Meta;

const Template: Story<FenceProps> = (args) => <Fence {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

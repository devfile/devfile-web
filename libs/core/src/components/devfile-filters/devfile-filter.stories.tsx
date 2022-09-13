import { Story, Meta } from '@storybook/react';
import DevfileFilter, { DevfileFilterProps } from './devfile-filter';

export default {
  component: DevfileFilter,
  title: 'DevfileFilter',
} as Meta;

const Template: Story<DevfileFilterProps> = (args) => <DevfileFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

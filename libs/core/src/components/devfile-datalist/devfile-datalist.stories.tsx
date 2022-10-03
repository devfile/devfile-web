import { Story, Meta } from '@storybook/react';
import DevfileDatalist, { DevfileDatalistProps } from './devfile-datalist';

export default {
  component: DevfileDatalist,
  title: 'DevfileDatalist',
} as Meta;

const Template: Story<DevfileDatalistProps> = (args) => <DevfileDatalist {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

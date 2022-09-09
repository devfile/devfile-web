import { Story, Meta } from '@storybook/react';
import DevfileSearch, { DevfileSearchProps } from './devfile-search';

export default {
  component: DevfileSearch,
  title: 'DevfileSearch',
} as Meta;

const Template: Story<DevfileSearchProps> = (args) => <DevfileSearch {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

import { Story, Meta } from '@storybook/react';
import DevfileCodeblock, { DevfileCodeblockProps } from './devfile-codeblock';

export default {
  component: DevfileCodeblock,
  title: 'DevfileCodeblock',
} as Meta;

const Template: Story<DevfileCodeblockProps> = (args) => <DevfileCodeblock {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

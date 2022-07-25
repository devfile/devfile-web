import { Story, Meta } from '@storybook/react';
import Prose, { ProseProps } from './prose';

export default {
  component: Prose,
  title: 'Prose',
} as Meta;

const Template: Story<ProseProps> = (args) => <Prose {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

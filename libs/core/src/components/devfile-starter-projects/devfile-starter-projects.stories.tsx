import { Story, Meta } from '@storybook/react';
import DevfileStarterProjects, { DevfileStarterProjectsProps } from './devfile-starter-projects';

export default {
  component: DevfileStarterProjects,
  title: 'DevfileStarterProjects',
} as Meta;

const Template: Story<DevfileStarterProjectsProps> = (args) => <DevfileStarterProjects {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

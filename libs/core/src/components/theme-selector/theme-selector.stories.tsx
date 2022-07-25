import { Story, Meta } from '@storybook/react';
import ThemeSelector, { ThemeSelectorProps } from './theme-selector';

export default {
  component: ThemeSelector,
  title: 'ThemeSelector',
} as Meta;

const Template: Story<ThemeSelectorProps> = (args) => <ThemeSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

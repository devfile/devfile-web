import { Story, Meta } from '@storybook/react';
import QuickLinks, { QuickLinksProps } from './quick-links';

export default {
  component: QuickLinks,
  title: 'QuickLinks',
} as Meta;

const Template: Story<QuickLinksProps> = (args) => <QuickLinks {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

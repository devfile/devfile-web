import { Story, Meta } from '@storybook/react';
import ValuePropositionSection, { ValuePropositionSectionProps } from './value-proposition-section';

export default {
  component: ValuePropositionSection,
  title: 'ValuePropositionSection',
} as Meta;

const Template: Story<ValuePropositionSectionProps> = (args) => (
  <ValuePropositionSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

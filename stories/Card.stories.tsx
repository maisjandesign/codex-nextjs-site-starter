import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from '../src/components/Card';
const meta = {
  title: 'Components/Content/Card',
  component: Card,
  args: { title: 'A shared language', children: 'Every value has a clear role.' },
  argTypes: { title: { control: 'text' }, children: { control: 'text' } },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const LongContent: Story = {
  args: {
    title: 'A title that wraps naturally across available space',
    children:
      'This example keeps the same padding and typography when its content becomes longer. Adjust the viewport to inspect wrapping.',
  },
};

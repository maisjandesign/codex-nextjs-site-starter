import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MotionLink } from '../src/components/motion/MotionLink';
const meta = {
  title: 'Components/Navigation/Text Link',
  component: MotionLink,
  args: { href: '/', children: 'Explore the project' },
  argTypes: { children: { control: 'text' }, href: { control: 'text' } },
} satisfies Meta<typeof MotionLink>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CurrentPage: Story = { args: { 'aria-current': 'page' } };

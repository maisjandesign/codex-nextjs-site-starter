import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section } from '../src/components/Section';
const meta = {
  title: 'Patterns/Section',
  component: Section,
  args: {
    kicker: '01 / Principles',
    title: 'Details that work together.',
    description: 'Shared spacing and coordinated motion.',
    children: 'Section content uses the same production component.',
    contentMotion: true,
  },
  argTypes: {
    kicker: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    children: { control: 'text' },
    contentMotion: { control: 'boolean' },
  },
} satisfies Meta<typeof Section>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutDescription: Story = { args: { description: undefined } };

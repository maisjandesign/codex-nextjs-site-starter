import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Field } from '../src/components/Field';
const meta = {
  title: 'Components/Forms/Field',
  component: Field,
  args: {
    id: 'story-field',
    label: 'Your name',
    placeholder: 'Enter your name',
    disabled: false,
    required: false,
    onChange: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    onChange: { control: false },
  },
} satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = {
  args: { id: 'story-field-error', error: 'Enter your name to continue.' },
};
export const Disabled: Story = { args: { id: 'story-field-disabled', disabled: true } };
export const Required: Story = { args: { id: 'story-field-required', required: true } };

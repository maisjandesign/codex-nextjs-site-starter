import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn, expect, within, userEvent } from 'storybook/test';
import { Button } from '../src/components/Button';
const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  args: {
    children: 'Continue',
    variant: 'primary',
    size: 'default',
    disabled: false,
    loading: false,
    onClick: fn(),
  },
  argTypes: {
    children: { control: 'text', description: 'Visible button label.' },
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['default', 'small'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    onClick: { control: false },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The production Button. Hover or keyboard-focus to inspect its shared GSAP fill and label roll. Controls change story props; they do not save project tokens.',
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Small: Story = { args: { size: 'small' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const LongLabel: Story = { args: { children: 'Continue to the next step' } };
export const ClickInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Continue' }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

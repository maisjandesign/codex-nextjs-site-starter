import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonLink } from '../src/components/Button';
const meta = {
  title: 'Components/Navigation/Button Link',
  component: ButtonLink,
  args: { children: 'Explore the site', href: '/', variant: 'primary', size: 'default' },
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['default', 'small'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A real Next.js link with the shared button appearance and motion. Storybook mocks routing; navigation integration is checked on the Next.js site.',
      },
    },
  },
} satisfies Meta<typeof ButtonLink>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Small: Story = { args: { size: 'small' } };

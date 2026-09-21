import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TypographyPreview } from '../src/components/design/TypographyPreview';
import { fontChoices } from '../src/design/token-editor.mjs';
const meta = {
  title: 'Foundations/Typography Playground',
  component: TypographyPreview,
  args: { font: 'system', text: 'Clear type. Consistent rhythm.' },
  argTypes: {
    font: { control: 'select', options: Object.keys(fontChoices) },
    text: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Compare system font stacks on the real heading scale, Card and Button. Changes stay in this story. Use the Next.js development Design tools panel to preview and save a project-wide font token. Font files are not downloaded; exact branded fonts must be loaded explicitly.',
      },
    },
  },
} satisfies Meta<typeof TypographyPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Sans: Story = {};
export const Serif: Story = { args: { font: 'editorial' } };
export const Mono: Story = { args: { font: 'technical' } };
export const LongHeading: Story = {
  args: { text: 'A longer headline exposes wrapping and rhythm across the shared components' },
};

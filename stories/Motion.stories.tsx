import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MotionShowcase } from '../src/components/motion/MotionShowcase';
const meta = {
  title: 'Motion/Studio',
  component: MotionShowcase,
  args: { allowSourceSave: false },
  argTypes: { allowSourceSave: { control: false, table: { disable: true } } },
  parameters: {
    docs: {
      description: {
        component:
          'The real shared motion studio: sequences, text, masks, Flip and live timing preview. Replay, pause, finish and reduce motion here. Source saving belongs to the Next.js development token lab; Storybook Controls are previews.',
      },
    },
  },
} satisfies Meta<typeof MotionShowcase>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Reduced: Story = { globals: { motion: 'reduced' } };

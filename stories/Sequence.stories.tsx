import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MotionSequence } from '../src/components/motion/MotionSequence';
import { Button } from '../src/components/Button';
function SequenceExample() {
  return (
    <MotionSequence className="story-stack" mode="opening">
      <span className="label muted" data-sequence-part="eyebrow" data-sequence-step="0">
        Opening sequence
      </span>
      <h1 data-sequence-part="heading" data-sequence-step="1">
        A deliberate entrance.
      </h1>
      <p data-sequence-part="copy" data-sequence-step="3">
        One timeline coordinates the heading, copy and action.
      </p>
      <div data-sequence-part="actions" data-sequence-step="4">
        <Button>Continue</Button>
      </div>
    </MotionSequence>
  );
}
const meta = {
  title: 'Motion/Opening Sequence',
  component: SequenceExample,
  parameters: {
    docs: {
      description: {
        component:
          'Uses the production MotionSequence API. Replay with the Storybook remount control or select slow motion in the toolbar. First-screen parallax is excluded.',
      },
    },
  },
} satisfies Meta<typeof SequenceExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Standard: Story = {};
export const Slow: Story = { globals: { motion: 'slow' } };
export const Reduced: Story = { globals: { motion: 'reduced' } };

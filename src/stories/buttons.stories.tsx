import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MotionButton } from "@/components/motion/motion-button";

const meta = {
  title: "Components/Button", component: MotionButton,
  args: { children: "Start a project" },
  argTypes: { variant: { control: "radio", options: ["solid", "outline"] } },
} satisfies Meta<typeof MotionButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const Disabled: Story = { args: { disabled: true } };
export const Link: Story = { args: { href: "/system", children: "Open the system" } };
export const LongLabel: Story = { args: { children: "Discuss design and development for your project" } };
export const HoverAndFocus: Story = { render: (args) =>
  <div className="story-frame stack"><p>Hover or use Tab: the fill rises, the label rolls, and the arrow moves. Every button runs its own GSAP animation.</p><div><MotionButton {...args} /></div></div> };

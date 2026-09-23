import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkflowCard } from "@/components/workflow-card";

const meta = { title: "Components/WorkflowCard", component: WorkflowCard, args: {
  index: "A — FIGMA", title: "From Figma to a website", description: "The layout, typography, and original assets from the design.", note: "Dimensions follow the 8px grid.",
} } satisfies Meta<typeof WorkflowCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const LongContent: Story = { args: { title: "A deliberately long heading to check line wrapping", description: "This longer description checks text rhythm and component reflow on narrow screens. It uses the same shared tokens as the rest of the website." } };

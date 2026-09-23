import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSection, WorkflowSection, MotionSection, SystemSection } from "@/components/home-sections";

const meta = { title: "Sections/Home", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Hero: Story = { render: () => <HeroSection /> };
export const Workflows: Story = { render: () => <WorkflowSection /> };
export const Motion: Story = { render: () => <MotionSection /> };
export const System: Story = { render: () => <SystemSection /> };

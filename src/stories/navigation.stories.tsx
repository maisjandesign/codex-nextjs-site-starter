import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnchorLink } from "@/components/motion/anchor-link";
import { MotionLink } from "@/components/motion/motion-link";

const meta = { title: "Components/Navigation", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Header: Story = { render: () => <SiteHeader /> };
export const Footer: Story = { render: () => <SiteFooter /> };
export const LinkHover: Story = { render: () => <div className="story-frame stack">
  <p>Hover or use Tab to draw the underline and move the label. The link works without MotionRoot.</p>
  <MotionLink href="/system" className="text-link">Explore the design system ↗</MotionLink>
</div> };
export const SamePageLink: Story = { render: () => <div className="story-frame stack">
  <AnchorLink href="#target" className="text-link">Jump to the section ↓</AnchorLink>
  <section className="section"><p>Intermediate section</p></section>
  <section id="target" className="section"><h2>Target section</h2></section>
</div> };

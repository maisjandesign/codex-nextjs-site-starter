import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import { Reveal, RevealText, RevealMedia } from "@/components/motion/reveal";
import { MotionRoot } from "@/components/motion/motion-root";

const meta = { title: "Motion/Presets", parameters: { motion: true, layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Lines: Story = { render: () => <div className="story-frame"><RevealText as="h1">Text reveals from below.</RevealText></div> };
export const Mask: Story = { render: () => <div className="story-frame"><Reveal><p className="text-large">The entire element rises through a mask.</p></Reveal></div> };
export const Media: Story = { render: () => <RevealMedia><Image src="/assets/demo/sculpture.svg" alt="Abstract rings" width={1344} height={560} /></RevealMedia> };
export const Scroll: Story = { parameters: { motion: false }, render: (_, context) => {
  const content = ["Scroll the page", "A soft reveal", "Motion by default"].map((text) => <section key={text} className="container section"><RevealText>{text}</RevealText><div className="section"><p>ScrollSmoother on desktop; native scrolling on touch.</p></div></section>);
  return context.viewMode === "docs" ? <>{content}</> : <MotionRoot>{content}</MotionRoot>;
} };

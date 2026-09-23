import { MotionLink } from "@/components/motion/motion-link";
import type { Metadata } from "next";
import { MotionButton } from "@/components/motion/motion-button";
import { RevealText } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Design system" };

export default function SystemPage() {
  return <>
    <header className="container site-header"><MotionLink href="/" className="text-link">← Back home</MotionLink><span>reference® / system</span></header>
    <main id="main" className="container section">
      <div className="stack"><span className="eyebrow">Shared website and Storybook tokens</span><RevealText as="h1">Design system</RevealText><p className="text-large">Sizes change at shared breakpoints. Every H1, H2, and H3 uses one consistent scale.</p></div>
      <section className="section stack" aria-label="Typography">
        <div className="specimen"><span>H1 / Heading</span><h1>Character</h1></div>
        <div className="specimen"><span>H2 / Section</span><h2>Precision</h2></div>
        <div className="specimen"><span>H3 / Subsection</span><h3>Attention to detail</h3></div>
        <div className="specimen"><span>H4 / Group</span><h4>Everything in its place</h4></div>
        <div className="specimen"><span>Body / 16–24 px</span><p>Body text uses a 16px font size and a 24px line height.</p></div>
      </section>
      <section className="stack" aria-label="Buttons"><h2>Actions</h2><div className="cluster"><MotionButton href="/">Primary</MotionButton><MotionButton href="/" variant="outline">Secondary</MotionButton><MotionButton disabled>Disabled</MotionButton></div></section>
    </main>
    <SiteFooter />
  </>;
}

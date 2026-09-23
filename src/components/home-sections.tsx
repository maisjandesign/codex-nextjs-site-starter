import Image from "next/image";
import { WorkflowCard } from "@/components/workflow-card";
import { Reveal, RevealText, RevealMedia } from "@/components/motion/reveal";
import { MotionButton } from "@/components/motion/motion-button";
import { AnchorLink } from "@/components/motion/anchor-link";


export function HeroSection() {
  return <>
      <section className="container hero">
        <div className="hero-intro"><span className="eyebrow">From reference to reality</span><span className="muted">Next.js / GSAP / Storybook</span></div>
        <RevealText as="h1" className="hero-title">Precision in detail. Freedom in motion.</RevealText>
        <div className="hero-bottom">
          <Reveal><p className="text-large">A working foundation for websites that keep the character of your design.</p></Reveal>
          <div className="cluster"><MotionButton href="/system">Explore the system</MotionButton><AnchorLink href="#motion" className="text-link">Explore motion ↓</AnchorLink></div>
        </div>
      </section>
      <div className="container">
        <RevealMedia><div className="visual" data-hover-media=""><Image src="/assets/demo/sculpture.svg" alt="Abstract sculpture of four black rings on a lime background" width={1344} height={560} preload /><span className="visual-label eyebrow">Form. Rhythm. Character.</span></div></RevealMedia>
      </div>
  </>;
}

export function WorkflowSection() {
  return <>
      <section id="workflow" className="container section">
        <div className="section-heading"><span className="eyebrow">01 / Two ways to start</span><RevealText>Your design is the starting point.</RevealText></div>
        <div className="workflow-grid">
          <Reveal><WorkflowCard index="A — FIGMA" title="From Figma to a website" description="The layout, typography, and original assets from your design. Images, icons, and SVGs stay in the project." note="Spacing and typography follow a shared 8px grid." /></Reveal>
          <Reveal delay={0.08}><WorkflowCard index="B — SCREENSHOT" title="From screenshot to code" description="A responsive website built from your screenshot. Missing photos and illustrations are generated from the reference." note="Text, buttons, and navigation remain real, interactive website elements." /></Reveal>
        </div>
      </section>
  </>;
}

export function MotionSection() {
  return <>
      <section id="motion" className="motion-panel section">
        <div className="container">
          <div className="section-heading"><span className="eyebrow">02 / Motion by default</span><RevealText>Fluid. Considered. Purposeful.</RevealText></div>
          <div className="motion-list">
            <Reveal><div className="motion-item stack"><h3>Smooth scrolling</h3><p className="muted">On desktop, the page follows your scroll smoothly. Touchscreens keep their natural scrolling behavior.</p></div></Reveal>
            <Reveal><div className="motion-item stack"><h3>Masked reveals</h3><p className="muted">Text rises from below, one line at a time. Images reveal as they enter the viewport.</p></div></Reveal>
            <Reveal><div className="motion-item stack"><h3>Responsive feedback</h3><p className="muted">A rising fill, rolling label, and moving arrow. Text links draw an underline as you approach.</p><div><MotionButton href="/system" variant="outline">Try it</MotionButton></div></div></Reveal>
            <Reveal><div className="motion-item stack"><h3>Respecting preferences</h3><p className="muted">When reduced motion is enabled, decorative animation stops. Content and controls stay accessible.</p></div></Reveal>
          </div>
        </div>
      </section>
  </>;
}

export function SystemSection() {
  return <>
      <section className="container section">
        <div className="section-heading"><span className="eyebrow">03 / A shared system</span><RevealText>Every component, in its place.</RevealText></div>
        <Reveal><div className="stack"><p className="text-large">One type scale. An 8px grid. A separate Storybook for components and their states.</p><div><MotionButton href="/system">View the specimens</MotionButton></div></div></Reveal>
      </section>
  </>;
}

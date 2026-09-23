import { MotionLink } from "@/components/motion/motion-link";

export function SiteFooter() {
  return <footer className="container site-footer rule">
    <span>reference® — Next.js workspace</span>
    <MotionLink href="/system" className="text-link">Open the design system ↗</MotionLink>
  </footer>;
}

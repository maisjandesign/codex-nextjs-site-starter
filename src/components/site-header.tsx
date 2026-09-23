import Link from "next/link";
import { AnchorLink } from "@/components/motion/anchor-link";
import { MotionLink } from "@/components/motion/motion-link";

export function SiteHeader() {
  return <header className="container site-header">
    <Link href="/" className="brand"><span className="brand-symbol" aria-hidden="true" />reference®</Link>
    <nav className="nav" aria-label="Main navigation">
      <AnchorLink href="#workflow">Process</AnchorLink>
      <AnchorLink href="#motion">Motion</AnchorLink>
      <MotionLink href="/system">Design system ↗</MotionLink>
    </nav>
  </header>;
}

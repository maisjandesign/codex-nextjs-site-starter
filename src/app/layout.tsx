import type { Metadata } from "next";
import { MotionRoot } from "@/components/motion/motion-root";
import { AnchorLink } from "@/components/motion/anchor-link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Reference / Next.js starter", template: "%s / Reference" },
  description: "A reference-first Next.js workspace with GSAP motion, Figma and screenshot workflows.",
  robots: { index: false, follow: false }, // Replace with the project's SEO policy before launch.
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <AnchorLink href="#main" className="skip-link" animate={false}>Skip to content</AnchorLink>
    {/* Fixed headers and modal portals belong outside MotionRoot. */}
    <MotionRoot>{children}</MotionRoot>
    <div id="overlay-root" />
  </body></html>;
}

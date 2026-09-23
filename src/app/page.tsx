import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection, WorkflowSection, MotionSection, SystemSection } from "@/components/home-sections";

export default function Home() {
  return <>
    <SiteHeader />
    <main id="main">
      <HeroSection />
      <WorkflowSection />
      <MotionSection />
      <SystemSection />
    </main>
    <SiteFooter />
  </>;
}

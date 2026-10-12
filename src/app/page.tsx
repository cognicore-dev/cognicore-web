import { IntroProvider } from "@/components/IntroProvider";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Capabilities } from "@/components/Capabilities";
import { Process } from "@/components/Process";
import { Work } from "@/components/Work";
import { Demo } from "@/components/Demo";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { marqueeFeatures, marqueeTools } from "@/lib/content";

export default function HomePage() {
  return (
    <IntroProvider>
      <Preloader />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Marquee items={marqueeFeatures} direction="left" />
        <Marquee items={marqueeTools} direction="right" variant="lime" />
        <Capabilities />
        <Process />
        <Work />
        <Demo />
        <Waitlist />
      </main>
      <Footer />
      <ScrollAnimations />
    </IntroProvider>
  );
}

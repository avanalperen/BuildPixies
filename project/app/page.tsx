import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PixieSection } from "@/components/landing/pixie-section";
import { OutputPreview } from "@/components/landing/output-preview";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <HowItWorks />
        <PixieSection />
        <OutputPreview />
      </main>
      <Footer />
    </>
  );
}

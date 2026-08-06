import IntroScreen from "@/components/intro/intro-screen";
import DemoPreview from "@/components/landing/demo-preview";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import PricingCta from "@/components/landing/pricing-cta";
import Footer from "@/components/layout/footer";


export default function Home() {
  return (
    <>
    <IntroScreen />
     <div className="flex min-h-screen flex-col bg-[#111018]">
     {/* <Navbar /> */}
     <HeroSection />
      <DemoPreview />
      <FeaturesSection />
      <PricingCta />
      <Footer />
    </div>
    </>
  )
}
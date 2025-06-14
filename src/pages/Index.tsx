
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import GradeSection from "@/components/landing/GradeSection";
import CallToAction from "@/components/landing/CallToAction";
import FloatingSymbols from "@/components/landing/FloatingSymbols";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0F1419] text-white overflow-hidden">
      <FloatingSymbols />
      <Header />
      <HeroSection />
      <FeatureSection />
      <GradeSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;

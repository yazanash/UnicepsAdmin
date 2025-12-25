"use client";
import HeroWrapper from "../components/HeroWrapper";
import GlassCard from "../components/GlassCard";
import LightOrbs from "../components/LightOrbs";
import FeaturesSection from "./components/FeaturesSection";
import StepsSection from "./components/StepsSection";
import { ProductLandingData } from "@/types/productLanding";
import PricingSection from "./components/PricingSection";
import DownloadBar from "./components/DownloadBar";
import FAQSection from "./components/FAQSection";
const ProductPage = ({ data }: { data: ProductLandingData }) => {
  return (
    <div>
      <HeroWrapper>
        <LightOrbs />
        <GlassCard product={data.product} />
      </HeroWrapper>
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature) => (
              <FeaturesSection key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
      <StepsSection steps={data.steps} />
      <PricingSection pricingPlans={data.pricingPlans} />

      {/* قسم الأسئلة الشائعة */}
      <FAQSection faqs={data.faQs} />

      {/* بار التحميل العائم */}
      <DownloadBar releases={data.latestReleases} />
    </div>
  );
};

export default ProductPage;

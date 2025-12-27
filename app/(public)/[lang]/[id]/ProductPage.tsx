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
const ProductPage = ({
  data,
  lang,
  dict,
}: {
  data: ProductLandingData;
  lang: string;
  dict: any;
}) => {
  const isAr = lang === "ar";
  const langDict=dict;
  return (
    <div>
      <HeroWrapper>
        <LightOrbs />
        <GlassCard product={data.product} lang={lang} showButton={false} />
      </HeroWrapper>
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#46cdcf] font-medium mb-2 uppercase tracking-widest text-sm">
              {dict.featuresBadge}
            </h2>
            <h3 className="text-4xl font-bold text-white">
              {dict.featuresTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature) => (
              <FeaturesSection key={feature.id} feature={feature} lang={lang} />
            ))}
          </div>
        </div>
      </section>
      <StepsSection
        steps={data.steps}
        lang={lang}
        dict={{
          badge: langDict.stepsBadge,
          title: langDict.stepsTitle,
        }}
      />
      <PricingSection
        pricingPlans={data.pricingPlans}
        lang={lang}
        dict={langDict}
      />

      {/* قسم الأسئلة الشائعة */}
      <FAQSection
        faqs={data.faQs}
        lang={lang}
        dict={{
          badge: langDict.faqBadge, // "الأسئلة الشائعة"
          title: langDict.faqTitle, // أو أضفها في الـ JSON
        }}
      />

      {/* بار التحميل العائم */}
      <DownloadBar releases={data.latestReleases} />
    </div>
  );
};

export default ProductPage;

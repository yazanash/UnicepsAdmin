"use client";
import React, { useState, useEffect } from "react";
import FeaturesSection from "./FeaturesSection";
import { apiServerGet } from "@/lib/api-server";
import StepsSection from "./StepsSection";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";
interface EcosystemWrapperProps {
  products: any[];
  lang: string;
  dict: any;
}

const EcosystemWrapper: React.FC<EcosystemWrapperProps> = ({
  products = [],
  lang,
  dict,
}) => {
  // 1. تحديد الـ slug للمنتج النشط افتراضياً
  const [activeSlug, setActiveSlug] = useState<string>(() => {
    return products.length > 0 ? products[0].slug : "";
  });

  const [landingData, setLandingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. جلب كل بيانات المنتج بطلب واحد فقط من الرابط عند اختيار المسار
  useEffect(() => {
    if (!activeSlug) return;
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        // بما أننا في Client Component، نطلب الـ API أو مسار الـ fetch المخصص
        const res = await apiServerGet(`/ProductLanding/${activeSlug}`);

        if (isMounted) {
          setLandingData(res);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
          console.error("Failed to fetch product landing data", error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [activeSlug]);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-16">
      {/* ==================== PATH SELECTOR (أزرار اختيار المسار) ==================== */}
      <section className="text-center py-6 mb-8">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          {lang === "ar"
            ? "منظومة Uniceps الرياضية"
            : "Uniceps Sports Ecosystem"}
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          {lang === "ar"
            ? "اختر مسارك، وادخل عالم "
            : "Choose your path, enter "}
          <span className="text-teal-400">Uniceps</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto mb-8 font-medium">
          {lang === "ar"
            ? "اختر المنصة أو المنتج لتظهر لك تفاصيله، مميزاته، وخططه مباشرة."
            : "Select a product to view its features, steps, and plans instantly."}
        </p>

        {/* أزرار اختيار المسار */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto bg-dark-900 border border-slate-800 p-2.5 rounded-2xl shadow-2xl">
          {products.map((prod) => {
            const isActive = prod.slug === activeSlug;
            const icon =
              prod.platform === 1 ? "📱" : prod.platform === 2 ? "🏢" : "📋";

            return (
              <button
                key={prod.id}
                onClick={() => setActiveSlug(prod.slug)}
                className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2.5 ${
                  isActive
                    ? "bg-teal-500 text-dark-950 shadow-lg shadow-teal-500/20 scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-dark-800"
                }`}
              >
                <span className="text-base">{icon}</span>
                <span>{lang === "ar" ? prod.nameAr : prod.name}</span>
              </button>
            );
          })}
        </div>
      </section>
      {loading ? (
        <div className="text-center py-32 text-teal-400 font-bold animate-pulse text-sm">
          {lang === "ar"
            ? "جاري تحميل تفاصيل المنتج..."
            : "Loading product details..."}
        </div>
      ) : landingData ? (
        <div className="space-y-20 transition-all duration-300">
          <FeaturesSection features={landingData.features} lang={lang} />
          <StepsSection steps={landingData.steps} lang={lang} />
          <PricingSection pricingPlans={landingData.pricingPlans} lang={lang} />
          <FAQSection faqs={landingData.faQs} lang={lang} />
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500 text-xs">
          {lang === "ar"
            ? "لا توجد بيانات متاحة لهذا المنتج"
            : "No data available"}
        </div>
      )}
    </div>
  );
};
export default EcosystemWrapper;

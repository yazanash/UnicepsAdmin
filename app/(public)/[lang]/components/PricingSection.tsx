"use client";
import { PlanItem } from "@/types/plans";
import React, { useState } from "react";

interface PricingSectionProps {
  pricingPlans: PlanItem[];
  lang: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  pricingPlans = [],
  lang,
}) => {
  if (!pricingPlans || pricingPlans.length === 0) return null;

  const isAr = lang === "ar";
  // حفظ الخيار المختار لكل عنصر أو خطة بناءً على الـ id
  const [selectedPlans, setSelectedPlans] = useState<{ [key: number]: number }>(
    {},
  );

  const handleSelectPlan = (planId: number, itemId: number) => {
    setSelectedPlans((prev) => ({ ...prev, [planId]: itemId }));
  };

  return (
    <section className="relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="bg-teal-500/10 text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-teal-500/20 uppercase tracking-widest">
          {isAr ? "الخطط والأسعار" : "Pricing Plans"}
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white mt-3">
          {isAr
            ? "اختر الباقة المناسبة لاحتياجك"
            : "Choose the right plan for your needs"}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          {isAr
            ? "استمتع بكافة مميزات المنظومة أوفلاين بالكامل وبأفضل الأسعار."
            : "Enjoy all ecosystem features fully offline at the best prices."}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pricingPlans.map((planItem) => {
          const activeItemId = selectedPlans[planItem.id] || planItem.id;

          return (
            <div
              key={planItem.id}
              className="bg-dark-900/80 border-2 border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl hover:border-teal-500/40 transition-all duration-300"
            >
              <div>
                {/* Plan Title */}
                <h3 className="text-xl font-black text-white mb-2">
                  {planItem.name}
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {isAr
                    ? `اشتراك لمدة ${planItem.durationString} (${planItem.daysCount} يوم)`
                    : `Subscription for ${planItem.durationString} (${planItem.daysCount} days)`}
                </p>

                {/* Plan Price Tag */}
                <div className="bg-dark-950/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between mb-8">
                  <span className="text-xs font-bold text-slate-300">
                    {isAr ? "السعر الإجمالي:" : "Total Price:"}
                  </span>
                  <span className="text-2xl font-black text-teal-400">
                    {planItem.isFree ? (isAr ? "مجاني" : "Free") : `$${planItem.price}`}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`/checkout?planItemId=${planItem.id}`}
                className="w-full text-center block bg-teal-500 hover:bg-teal-400 text-dark-950 font-black text-xs py-4 rounded-xl transition shadow-lg shadow-teal-500/20"
              >
                💳 {isAr ? "اشترك الآن واستفد من العرض ←" : "Subscribe Now →"}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingSection;
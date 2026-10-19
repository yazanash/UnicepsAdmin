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
  const [selectedPlans, setSelectedPlans] = useState<{ [key: number]: number }>(
    {},
  );

  return (
    <section id="pricing" className="relative py-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="bg-teal-500/10 text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-teal-500/20 uppercase tracking-widest inline-block mb-3">
          {isAr ? "الخطط والأسعار" : "Pricing Plans"}
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
          {isAr
            ? "اختر الباقة المناسبة لاحتياجك"
            : "Choose the right plan for your needs"}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-md mx-auto">
          {isAr
            ? "استمتع بكافة مميزات المنظومة أوفلاين بالكامل."
            : "Enjoy all ecosystem features fully offline."}
        </p>
      </div>

      {/* Pricing Cards Grid (Simple & Clean) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {pricingPlans.map((planItem, index) => {
          const isFeatured = index === 0;

          return (
            <div
              key={planItem.id}
              className={`bg-dark-900/90 border p-6 md:p-8 rounded-3xl flex flex-col justify-between transition-all shadow-xl ${
                isFeatured
                  ? "border-teal-500/50 shadow-teal-500/5"
                  : "border-slate-800"
              }`}
            >
              <div>
                {/* Plan Title */}
                <h3 className="text-xl font-black text-white mb-1">
                  {planItem.name}
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  {isAr
                    ? `اشتراك لمدة ${planItem.durationString} (${planItem.daysCount} يوم)`
                    : `Subscription for ${planItem.durationString} (${planItem.daysCount} days)`}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline justify-between border-t border-slate-800/80 pt-6 mb-8">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isAr ? "السعر:" : "Price:"}
                  </span>
                  <span className="text-3xl font-black text-teal-400">
                    {planItem.isFree
                      ? isAr
                        ? "مجاني"
                        : "Free"
                      : `$${planItem.price}`}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`/checkout?planItemId=${planItem.id}`}
                className="w-full text-center block bg-teal-500 hover:bg-teal-400 text-dark-950 font-black text-xs py-3.5 rounded-xl transition shadow-lg shadow-teal-500/10"
              >
                {isAr ? "اشترك الآن ←" : "Subscribe Now →"}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingSection;

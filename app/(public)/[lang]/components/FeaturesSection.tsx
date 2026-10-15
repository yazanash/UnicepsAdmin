"use client";
import React from "react";

interface FeatureItem {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

interface FeaturesSectionProps {
  features: FeatureItem[];
  lang: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features = [],
  lang,
}) => {
  if (!features || features.length === 0) return null;

  const isAr = lang === "ar";

  return (
    <section className="relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="bg-teal-500/10 text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-teal-500/20 uppercase tracking-widest">
          {isAr ? "المميزات والخصائص" : "Core Features"}
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white mt-3">
          {isAr
            ? "كل ما تحتاجه لتنجح في منظومتك"
            : "Everything you need to succeed"}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          {isAr
            ? "قدرات تقنية متقدمة مصممة خصيصاً لتمنحك أعلى أفاءة وسرعة."
            : "Advanced technical capabilities designed to give you peak performance."}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 max-w-4xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-dark-900/60 border border-slate-800/80 p-6 rounded-3xl hover:border-teal-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
          >
            <div>
              {/* Check Icon or Badge */}
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-black text-sm mb-4 border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-dark-950 transition-colors">
                ✓
              </div>

              {/* Title */}
              <h3 className="font-bold text-base text-white mb-2">
                {isAr ? feature.titleAr : feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr ? feature.descriptionAr : feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

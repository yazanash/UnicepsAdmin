"use client";
import React from "react";
import Image from "next/image";

interface StepItem {
  id: number;
  stepNumber: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  imageUrl?: string;
}

interface StepsSectionProps {
  steps: StepItem[];
  lang: string;
}

const StepsSection: React.FC<StepsSectionProps> = ({ steps = [], lang }) => {
  if (!steps || steps.length === 0) return null;

  const isAr = lang === "ar";
  // ترتيب الخطوات تصاعدياً حسب الـ stepNumber كإجراء احترازي
  const sortedSteps = [...steps].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <section className="relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="bg-teal-500/10 text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-teal-500/20 uppercase tracking-widest">
          {isAr ? "سير العمل" : "Workflow"}
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white mt-3">
          {isAr
            ? "كيف تعمل المنظومة معك خطوة بخطوة؟"
            : "How it works step by step"}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          {isAr
            ? "خطوات بسيطة ومباشرة تضمن لك البدء الفوري بدون تعقيد."
            : "Simple and direct steps to ensure you get started instantly."}
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 max-w-4xl mx-auto">
        {sortedSteps.map((step) => (
          <div
            key={step.id || step.stepNumber}
            className="bg-dark-900/60 border border-slate-800/80 p-6 rounded-3xl hover:border-teal-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
          >
            <div>
              {/* Step Number Badge */}
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-black text-sm mb-4 border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-dark-950 transition-colors">
                {step.stepNumber}
              </div>

              {/* Title */}
              <h3 className="font-bold text-base text-white mb-2">
                {isAr ? step.titleAr : step.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {isAr ? step.descriptionAr : step.description}
              </p>
            </div>

            {/* Optional Image */}
            {step.imageUrl && (
              <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-slate-800/80 mt-2">
                <Image
                  src={step.imageUrl}
                  alt={step.title || "Step Illustration"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsSection;

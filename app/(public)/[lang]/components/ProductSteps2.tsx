"use client";
import React from "react";
import Image from "next/image";
import { UserStepType } from "@/types/userStep";

interface StepsProps {
  steps: UserStepType[];
  activeProduct: any;
  lang: string;
}

const ProductSteps: React.FC<StepsProps> = ({ steps, activeProduct, lang }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-16 bg-dark-950 border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="bg-teal-500/10 text-teal-400 text-xs font-bold px-3.5 py-1 rounded-full border border-teal-500/20">
            {lang === "ar" ? "سير العمل" : "Workflow"}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-3">
            {lang === "ar" ? "كيف يعمل " : "How "}
            <span className="text-teal-400">
              {lang === "ar" ? activeProduct?.nameAr : activeProduct?.name}
            </span>
            {lang === "ar" ? " معك؟" : " works?"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.id || step.stepNumber}
              className="bg-dark-900/60 border border-slate-800/80 p-6 rounded-3xl relative flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-lg"
            >
              <div>
                <div className="w-10 h-10 bg-teal-500/10 text-teal-400 rounded-xl font-black text-xs flex items-center justify-center mb-4 border border-teal-500/20">
                  {step.stepNumber}
                </div>
                <h3 className="font-bold text-base text-white mb-2">
                  {lang === "ar" ? step.titleAr : step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {lang === "ar" ? step.descriptionAr : step.description}
                </p>
              </div>

              {step.imageUrl && (
                <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-slate-800 mt-2">
                  <Image
                    src={step.imageUrl}
                    alt={step.title || "Step"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSteps;

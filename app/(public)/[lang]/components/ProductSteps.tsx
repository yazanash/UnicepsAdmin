"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ProductStepsProps {
  activeProductId: number;
  activeProductName?: string;
  lang: string;
}

const ProductSteps: React.FC<ProductStepsProps> = ({
  activeProductId,
  activeProductName,
  lang,
}) => {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // جلب خطوات المنتج المحدد فقط حصراً عند تغير الـ activeProductId
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/user-steps?productId=${activeProductId}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          // ترتيب الخطوات حسب StepNumber
          const sorted = (data || []).sort(
            (a: any, b: any) => a.stepNumber - b.stepNumber
          );
          setSteps(sorted);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeProductId]);

  if (!loading && steps.length === 0) return null;

  return (
    <section className="py-12 border-t border-slate-800/80">
      {/* Title Header */}
      <div className="text-center mb-10">
        <span className="bg-teal-500/10 text-teal-400 text-xs font-bold px-3.5 py-1 rounded-full border border-teal-500/20">
          {lang === "ar" ? "سير العمل" : "User Workflow"}
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-3">
          {lang === "ar" ? "كيف يعمل " : "How "}
          <span className="text-teal-400">{activeProductName}</span>
          {lang === "ar" ? " معك خطوة بخطوة؟" : " works for you?"}
        </h2>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-dark-900/80 rounded-3xl border border-slate-800"></div>
          ))}
        </div>
      ) : (
        /* Steps Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.id || step.stepNumber}
              className="bg-dark-900/60 border border-slate-800 p-6 rounded-3xl relative flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-lg group"
            >
              <div>
                {/* Step Badge Number */}
                <div className="w-9 h-9 bg-teal-500/10 text-teal-400 rounded-xl font-black text-xs flex items-center justify-center mb-4 border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-dark-950 transition-colors">
                  {step.stepNumber}
                </div>

                {/* Step Title */}
                <h3 className="font-bold text-sm md:text-base text-white mb-2">
                  {lang === "ar" ? step.titleAr : step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {lang === "ar" ? step.descriptionAr : step.description}
                </p>
              </div>

              {/* Optional Step Image */}
              {step.imageUrl && (
                <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-slate-800/80 mt-2">
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
      )}
    </section>
  );
};

export default ProductSteps;
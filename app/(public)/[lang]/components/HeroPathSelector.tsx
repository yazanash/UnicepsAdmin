"use client";
import React, { useState } from "react";
import Link from "next/link";

interface HeroPathSelectorProps {
  products: any[];
  lang: string;
  buttonText?: string;
}

const HeroPathSelector: React.FC<HeroPathSelectorProps> = ({
  products,
  lang,
  buttonText,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<number>(1); // 1: Mobile, 2: Desktop, etc.

  const currentProduct =
    products?.find((p) => p.platform === selectedPlatform) || products?.[0];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-dark-950 overflow-hidden border-b border-slate-800/60">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          {lang === "ar"
            ? "المنظومة الرياضية الأذكى والأسرع أوفلاين"
            : "The Smartest Offline Sports Ecosystem"}
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
          {lang === "ar"
            ? "اختر مسارك، وادخل عالم "
            : "Choose your path, enter "}
          <span className="text-teal-400">Uniceps</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto mb-10 font-medium">
          {lang === "ar"
            ? "منظومة متكاملة تلبي احتياجات اللاعبين، المدربين، وإدارة الصالات الرياضية بكفاءة عالية وبدون قيود الإنترنت."
            : "An integrated ecosystem meeting the needs of players, coaches, and gym management efficiently offline."}
        </p>

        {/* Path Selector Tabs (The Core UX Switcher) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto bg-dark-900/90 border border-slate-800 p-2.5 rounded-2xl shadow-2xl mb-12">
          {/* Path 1: Mobile / Player */}
          <button
            onClick={() => setSelectedPlatform(1)}
            className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 ${
              selectedPlatform === 1
                ? "bg-teal-500 text-dark-950 shadow-lg shadow-teal-500/20 scale-[1.02]"
                : "text-slate-400 hover:text-white hover:bg-dark-800/60"
            }`}
          >
            <span className="text-base">📱</span>
            <span>
              {lang === "ar" ? "تطبيق اللاعب (Mobile)" : "Player App"}
            </span>
          </button>

          {/* Path 2: Desktop / Gym Management */}
          <button
            onClick={() => setSelectedPlatform(2)}
            className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 ${
              selectedPlatform === 2
                ? "bg-teal-500 text-dark-950 shadow-lg shadow-teal-500/20 scale-[1.02]"
                : "text-slate-400 hover:text-white hover:bg-dark-800/60"
            }`}
          >
            <span className="text-base">🏢</span>
            <span>
              {lang === "ar" ? "إدارة الصالات (Desktop)" : "Gym Management"}
            </span>
          </button>

          {/* Path 3: Web / Coach Tool */}
          <button
            onClick={() => setSelectedPlatform(3)}
            className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 ${
              selectedPlatform === 3
                ? "bg-teal-500 text-dark-950 shadow-lg shadow-teal-500/20 scale-[1.02]"
                : "text-slate-400 hover:text-white hover:bg-dark-800/60"
            }`}
          >
            <span className="text-base">📋</span>
            <span>{lang === "ar" ? "أداة الكوتش (Web)" : "Coach Tool"}</span>
          </button>
        </div>

        {/* Dynamic Content Card Based on Selected Path */}
        {currentProduct && (
          <div className="max-w-3xl mx-auto bg-dark-900/60 border border-slate-800/80 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-2xl text-start transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-bold bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full border border-teal-500/20">
                  {lang === "ar" ? "مسار نشط" : "Active Path"} :{" "}
                  {currentProduct.slug}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white mt-2">
                  {lang === "ar" ? currentProduct.nameAr : currentProduct.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === "ar"
                    ? currentProduct.descriptionAr
                    : currentProduct.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full md:w-auto">
                <a
                  href={`#pricing`}
                  className="block text-center bg-teal-500 hover:bg-teal-400 text-dark-950 font-black text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-teal-500/20"
                >
                  {buttonText ||
                    (lang === "ar" ? "استعراض الباقات ←" : "View Plans →")}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroPathSelector;

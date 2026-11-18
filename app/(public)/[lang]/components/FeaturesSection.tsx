"use client";
import React from "react";
import FeatureCard from "./FeatureCard";
import { FeatureType } from "@/types/productFeature";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface FeaturesSectionProps {
  features: FeatureType[];
  lang: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features = [],
  lang,
}) => {
  if (!features || features.length === 0) return null;

  const isAr = lang === "ar";
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <section id="features" className="relative py-10">
      {/* Section Header */}
      <div className="text-center mb-12 px-4">
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
            ? "قدرات تقنية متقدمة مصممة خصيصاً لتمنحك أعلى أداء وسرعة."
            : "Advanced technical capabilities designed to give you peak performance."}
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full pb-14"
        >
          {features.map((feature) => (
            <SwiperSlide key={feature.id} className="h-auto">
              <FeatureCard
                feature={feature}
                isAr={isAr}
                baseUrl={BASE_URL ?? ""}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturesSection;
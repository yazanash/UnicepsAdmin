"use client";
import React from "react";
import Image from "next/image";
import FeatureCard from "./FeatureCard";
import { FeatureType } from "@/types/productFeature";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface FeaturesSectionProps {
  features: FeatureType[];
  lang: string;
  // onSlideChange: (index: number) => void;
  // buttonText: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features = [],
  lang,
  // onSlideChange,
  // buttonText,
}) => {
  if (!features || features.length === 0) return null;

  const isAr = lang === "ar";
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <section id="features" className="relative">
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
      <div className="relative z-10 max-w-4xl h-full mx-auto py-2">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          // onSlideChange={(swiper: SwiperType) =>
          //   onSlideChange(swiper.realIndex)
          // }
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="w-full h-full"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={feature.id}>
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

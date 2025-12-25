"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import GlassCard from "./GlassCard";
import { ProductType } from "@/types/products";

interface HeroSliderProps {
  onSlideChange: (index: number) => void;
  products : ProductType[]
}
const HeroSlider = ({ onSlideChange,products }: HeroSliderProps) => {
  return (
    <div className="relative z-10 w-full h-full mx-auto px-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper: SwiperType) => onSlideChange(swiper.realIndex)}
        // --- إعدادات الـ Autoplay ---
        autoplay={{
          delay: 2500, // الوقت بين كل ستايد (بالملي ثانية) - هنا ثانيتين ونصف
          disableOnInteraction: false, // استمرار التشغيل التلقائي حتى بعد تفاعل المستخدم (سحب اليد)
          pauseOnMouseEnter: true, // إيقاف مؤقت عند وضع الماوس فوق السلايدر
        }}
        loop={true} // جعل السلايدر يدور بشكل لا نهائي
        className="w-full h-full"
      >
       {products.map((product, index) => (
          <SwiperSlide key={product.id}>
            {/* نمرر بيانات المنتج الواحد لكل كرت */}
            <GlassCard 
               product={product} 
               reverse={index % 2 !== 0} 
            />
          </SwiperSlide>
        ))}
         </Swiper>
    </div>
  );
};

export default HeroSlider;

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
    lang:string;
  buttonText:string;
}
const HeroSlider = ({ onSlideChange,products,lang,buttonText }: HeroSliderProps) => {
  return (
    <div className="relative z-10 w-full h-full mx-auto">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={(swiper: SwiperType) => onSlideChange(swiper.realIndex)}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, 
          pauseOnMouseEnter: true, 
        }}
        loop={true} 
        className="w-full h-full"
      >
       {products.map((product, index) => (
          <SwiperSlide key={product.id}>
            <GlassCard 
               product={product} 
               lang={lang}
               buttonText={buttonText}
               reverse={index % 2 !== 0} 
            />
          </SwiperSlide>
        ))}
         </Swiper>
    </div>
  );
};

export default HeroSlider;

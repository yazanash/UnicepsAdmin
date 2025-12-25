"use client";
import HeroWrapper from "./HeroWrapper";
import HeroSlider from "./HeroSlider";
import LightOrbs from "./LightOrbs";
import { ProductType } from "@/types/products";
import { useState } from "react";
interface HeroSliderWrapperProps {
  products: ProductType[];
}
const HeroSliderWrapper = ({ products }: HeroSliderWrapperProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <HeroWrapper>
      <LightOrbs activeIndex={activeIndex} />
      <HeroSlider products={products} onSlideChange={setActiveIndex} />
    </HeroWrapper>
  );
};

export default HeroSliderWrapper;

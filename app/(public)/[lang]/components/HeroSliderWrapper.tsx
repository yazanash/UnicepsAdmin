"use client";
import HeroWrapper from "./HeroWrapper";
import HeroSlider from "./HeroSlider";
import LightOrbs from "./LightOrbs";
import { ProductType } from "@/types/products";
import { useState } from "react";
interface HeroSliderWrapperProps {
  products: ProductType[];
  lang:string;
  buttonText:string;
}
const HeroSliderWrapper = ({ products,lang,buttonText }: HeroSliderWrapperProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <HeroWrapper>
      <LightOrbs activeIndex={activeIndex}/>
      <HeroSlider products={products} lang={lang} buttonText={buttonText} onSlideChange={setActiveIndex} />
    </HeroWrapper>
  );
};

export default HeroSliderWrapper;

import WhyUniceps from "./components/WhyUniceps";
import CoreProducts from "./components/CoreProducts";
import Promises from "./components/Promises";
import FinalCTA from "./components/FinalCTA";
import { apiServerGet } from "@/lib/api-server";
import HeroSliderWrapper from "./components/HeroSliderWrapper";
const welcome = async () => {
  const products = await apiServerGet("/Product");

  return (
    <main>
      <HeroSliderWrapper products={products} />
      <WhyUniceps />
      <CoreProducts products={products} />
      <Promises />
      <FinalCTA />
    </main>
  );
};

export default welcome;

import WhyUniceps from "./components/WhyUniceps";
import CoreProducts from "./components/CoreProducts";
import Promises from "./components/Promises";
import FinalCTA from "./components/FinalCTA";
import { apiServerGet } from "@/lib/api-server";
import HeroSliderWrapper from "./components/HeroSliderWrapper";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";

const welcome = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const products = await apiServerGet("/Product");

  return (
    <main>
      <HeroSliderWrapper
        products={products}
        lang={lang}
        buttonText={dict.common.download}
      />
      <WhyUniceps content={dict.whyUniceps} />
      <CoreProducts products={products} content={dict.solution} lang={lang} />
      <Promises content={dict.promises} />
      <FinalCTA content={dict.finalCTA} />
    </main>
  );
};

export default welcome;

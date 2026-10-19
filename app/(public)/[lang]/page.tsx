import { apiServerGet } from "@/lib/api-server";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import EcosystemWrapper from "./components/EcosystemMainView";
const welcome = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const products = await apiServerGet("/Product");

  return (
    <main>
      <EcosystemWrapper products={products} lang={lang} dict={dict} />
      {/* <HeroSliderWrapper
        products={products}
        lang={lang}
        buttonText={dict.common.download}
      /> */}
      {/* <HeroPathSelector products={products} lang={lang}  />
      <WhyUniceps content={dict.whyUniceps} />
      <CoreProducts products={products} content={dict.solution} lang={lang} />
      <Promises content={dict.promises} />
      <FinalCTA content={dict.finalCTA} /> */}
    </main>
  );
};

export default welcome;

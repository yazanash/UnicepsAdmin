import { apiServerGet } from "@/lib/api-server";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import EcosystemWrapper from "./components/EcosystemMainView";
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ product?: string }>;
}
const welcome = async ({ params, searchParams }: PageProps) => {
  const { lang } = await params;
  const { product: queryProductSlug } = await searchParams;

  const dict = await getDictionary(lang);
  const products = await apiServerGet("/Product");

  const activeSlug =
    queryProductSlug || (products.length > 0 ? products[0].slug : "");

  let initialLandingData = null;
  if (activeSlug) {
    try {
      initialLandingData = await apiServerGet(`/ProductLanding/${activeSlug}`);
    } catch (e) {
      console.error("Failed to fetch initial landing data", e);
    }
  }
  return (
    <main>
      <EcosystemWrapper
        products={products}
        lang={lang}
        dict={dict}
        initialSlug={activeSlug}
        initialLandingData={initialLandingData}
      />
    </main>
  );
};

export default welcome;

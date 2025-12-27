import React from "react";
import ProductPage from "./ProductPage";
import { apiServerGet } from "@/lib/api-server";
import { ProductLandingData } from "@/types/productLanding";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";

const ProductLandingPage = async ({
  params,
}: {
 params: Promise<{ id: string; lang: Locale }>;
}) => {
  const { id, lang } = await params;
  const dict = await getDictionary(lang);
  const data: ProductLandingData = await apiServerGet(`/ProductLanding/${id}`);
  if (!data) return <div>Product Not Found</div>;
  return <ProductPage data={data} lang={lang} dict={dict.productPage}/>;
};

export default ProductLandingPage;

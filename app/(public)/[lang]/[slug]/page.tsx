import React from "react";
import { Metadata } from "next";
import ProductPage from "./ProductPage";
import { apiServerGet } from "@/lib/api-server";
import { ProductLandingData } from "@/types/productLanding";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import ProductSEO from "./components/ProductSEO";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: Locale };
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const data: ProductLandingData = await apiServerGet(
    `/ProductLanding/${slug}`,
  );
  const isAr = lang === "ar";

  if (!data)
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const productUrl = `https://uniceps.trio-verse.com/${lang}/${slug}`;
  const imageSrc = data.product.heroImage
    ? `${BASE_URL}${data.product.heroImage}`
    : `${BASE_URL}/placeholder-app.png`;

  return {
    title: isAr ? data.product.nameAr : data.product.name,
    description: isAr ? data.product.descriptionAr : data.product.description,
    openGraph: {
      title: isAr ? data.product.nameAr : data.product.name,
      description: isAr ? data.product.descriptionAr : data.product.description,
      url: productUrl,
      images: [
        { url: imageSrc, alt: isAr ? data.product.nameAr : data.product.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isAr ? data.product.nameAr : data.product.name,
      description: isAr ? data.product.descriptionAr : data.product.description,
      images: [imageSrc],
    },
    metadataBase: new URL("https://uniceps.trio-verse.com"),
    alternates: { canonical: productUrl },
  };
}

const ProductLandingPage = async ({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}) => {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  const data: ProductLandingData = await apiServerGet(`/ProductLanding/${slug}`);
  if (!data) return <div>Product Not Found</div>;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const productUrl = `https://uniceps.trio-verse.com/${lang}/${slug}`;
  const imageSrc = data.product.heroImage
    ? `${BASE_URL}${data.product.heroImage}`
    : `${BASE_URL}/placeholder-app.png`;
  const isAr = lang === "ar";

  const productJSONLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isAr ? data.product.nameAr : data.product.name,
    description: isAr ? data.product.descriptionAr : data.product.description,
    image: [imageSrc],
    sku: data.product.id,
    offers: data.pricingPlans.map((plan) => ({
      "@type": "Offer",
      price: plan.planItems[0]?.price ?? 0,
      priceCurrency: "USD",
      url: productUrl,
      availability: "https://schema.org/InStock",
    })),
  };

  const faqJSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faQs.map((faq) => ({
      "@type": "Question",
      name: isAr ? faq.questionAr : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isAr ? faq.answerAr : faq.answer,
      },
    })),
  };

  return (
    <>
      <ProductSEO productJSONLD={productJSONLD} faqJSONLD={faqJSONLD} />
      <ProductPage data={data} lang={lang} dict={dict.productPage} />
    </>
  );
};

export default ProductLandingPage;

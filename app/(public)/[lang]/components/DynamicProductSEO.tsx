// components/DynamicProductSEO.tsx
"use client";
import React from "react";

interface DynamicSEOProps {
  landingData: any;
  lang: string;
  activeSlug: string;
}

export default function DynamicProductSEO({ landingData, lang, activeSlug }: DynamicSEOProps) {
  if (!landingData || !landingData.product) return null;

  const isAr = lang === "ar";
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://uniceps.trio-verse.com";
  const productUrl = `${BASE_URL}/${lang}/${activeSlug}`;
  const imageSrc = landingData.product.heroImage
    ? `${BASE_URL}${landingData.product.heroImage}`
    : `${BASE_URL}/placeholder-app.png`;

  const productJSONLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isAr ? landingData.product.nameAr : landingData.product.name,
    description: isAr ? landingData.product.descriptionAr : landingData.product.description,
    image: [imageSrc],
    sku: landingData.product.id,
    offers: (landingData.pricingPlans || []).map((plan: any) => ({
      "@type": "Offer",
      price: plan.price ?? 0,
      priceCurrency: "USD",
      url: productUrl,
      availability: "https://schema.org/InStock",
    })),
  };

  const faqJSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (landingData.faQs || []).map((faq: any) => ({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJSONLD) }}
      />
    </>
  );
}
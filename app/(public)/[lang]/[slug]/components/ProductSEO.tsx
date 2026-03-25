"use client";
import Head from "next/head";

export default function ProductSEO({ productJSONLD, faqJSONLD }: { productJSONLD: any; faqJSONLD: any }) {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJSONLD) }} />
    </Head>
  );
}

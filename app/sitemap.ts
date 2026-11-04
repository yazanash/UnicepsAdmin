import { MetadataRoute } from "next";

// مثال: اللغات المتوفرة
const locales = ["en", "ar"];
const baseUrl = "https://uniceps.trio-verse.com";
// مثال: استدعاء المنتجات من API
async function fetchProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Product`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((p: any) => p.slug);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/terms", "/privacy"];

  let sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. الصفحات الثابتة
  staticPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ar: `${baseUrl}/ar${page}`,
          en: `${baseUrl}/en${page}`,
        },
      },
    });
  });

  return sitemapEntries;
}

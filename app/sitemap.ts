import { MetadataRoute } from "next";

// مثال: اللغات المتوفرة
const locales = ["en", "ar"];

// مثال: استدعاء المنتجات من API
async function fetchProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Products`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((p: any) => p.id);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProducts();

  const staticPages = ["/terms", "/privacy"]; // صفحات ثابتة لكل لغة

  let urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // الصفحة الرئيسية لكل لغة
    urls.push({
      url: `https://uniceps.trio-verse.com/${locale}`,
      lastModified: new Date(),
    });

    // الصفحات الثابتة لكل لغة
    staticPages.forEach((page) => {
      urls.push({
        url: `https://uniceps.trio-verse.com/${locale}${page}`,
        lastModified: new Date(),
      });
    });

    // الصفحات الديناميكية لكل لغة
    products.forEach((id:any) => {
      urls.push({
        url: `https://uniceps.trio-verse.com/${locale}/${id}`,
        lastModified: new Date(),
      });
    });
  }

  return urls;
}

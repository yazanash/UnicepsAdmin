import React from "react";
import ProductPage from "./ProductPage";
import { apiServerGet } from "@/lib/api-server";
import { ProductLandingData } from "@/types/productLanding";

const ProductLandingPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data: ProductLandingData = await apiServerGet(`/ProductLanding/${id}`);
  if (!data) return <div>Product Not Found</div>;
  return <ProductPage data={data} />;
};

export default ProductLandingPage;

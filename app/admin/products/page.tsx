"use client" 
import ProductTable from "./component/ProductTable";
import { ProductType } from "@/types/products";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
const Products = () => {
   const [products, setProducts] = useState<ProductType[] | null>(null);
    const [loading, setLoading] = useState(true);
   useEffect(() => {
    api
      .get(`/Product`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan", err);
        setLoading(false);
      });
  });

  if (loading) return <div>جاري التحميل...</div>;
  if (!products) return <div>الخطة غير موجودة.</div>;

  
  return <ProductTable products={products} />;
};

export default Products;

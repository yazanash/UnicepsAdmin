"use client"
import { PLATFORM_MAP_REVERSE } from "@/types/products";
import ReleasesTable from "./components/ReleasesTable";
import { ReleaseType } from "@/types/release";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ProductReleases() {
  const params = useParams();
    const productId = params.productId;
   const [releases, setReleases] = useState<ReleaseType[] | null>(null);
      const [loading, setLoading] = useState(true);
     useEffect(() => {
      api
        .get(`/Release?productId=${productId}`)
        .then((res) => {
          setReleases(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching plan", err);
          setLoading(false);
        });
    },[productId]);
  
    if (loading) return <div>جاري التحميل...</div>;
    if (!setReleases) return <div>الخطة غير موجودة.</div>;

  return <ReleasesTable productId={String(productId)} releases={releases!} />;
}

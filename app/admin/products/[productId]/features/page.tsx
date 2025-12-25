"use client";
import { FeatureType } from "@/types/productFeature";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import FeatureModal from "./components/AddFeatureModal";
const FeaturesPage = () => {
  const params = useParams();
  const productId = params.productId;
  const [features, setFeatures] = useState<FeatureType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/Feature/product/${productId}`)
      .then((res) => {
        setFeatures(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Features</CardTitle>
          <FeatureModal
            productId={Number(productId)}
            onSave={async (feature) => {
              const res = await api.post(`/Feature`, feature);
              const createdFeature = res.data;
              setFeatures((prev) => {
                // إذا كانت الحالة السابقة نل، اعتبرها مصفوفة فارغة ثم أضف العنصر
                const currentFeatures = prev || [];
                return [...currentFeatures, createdFeature];
              });
            }}
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features!.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{String(req.id)}</TableCell>
                  <TableCell>{req.title}</TableCell>
                  <TableCell>{req.description}</TableCell>
                  <TableCell>
                    <FeatureModal
                      productId={Number(productId)}
                      feature={req} // نمرر البيانات الحالية هنا
                      onSave={async (feature) => {
                        const res = await api.put(`/Feature/${feature.id}`, feature);
                        const createdFeature = res.data;
                        setFeatures(
                          (prev) =>
                            prev?.map((f) =>
                              f.id === feature.id ? feature : f
                            ) || []
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!features && <div>No Features yet</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesPage;

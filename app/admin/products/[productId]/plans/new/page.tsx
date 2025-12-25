"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
export default function NewPlanPage() {
  const [name, setName] = useState("");
  const [targetUserType, setTargetUserType] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams(); // سيجلب productId من الرابط تلقائياً
  const productId = params.productId;
  const createPlan = async () => {
    try {
      setLoading(true);

      // استدعاء API لإنشاء Plan جديدة
      const res = await api.post("/Plan", {
        name,
        productId,
      });
      console.log(res);
      const createdPlan = res.data;
      console.log("Plan created:", createdPlan);

      // بعد النجاح، رجع المستخدم لصفحة إدارة الـ plan الجديدة
      router.push(`/admin/proucts/${productId}/plans/${createdPlan.id}`);
    } catch (err) {
      console.error("Error creating plan", err);
      alert("Failed to create plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Plan</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Plan Name (e.g. Premium)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={createPlan} disabled={loading}>
            {loading ? "Creating..." : "Create Plan"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

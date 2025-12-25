"use client";
import { Plan } from "@/types/plans";
import ManagePlan from "../components/ManagePlan";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ManagePlanPage() {
  const params = useParams();
  const planId = params.planId;
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/Plan/Get/${planId}`)
      .then((res) => {
        setPlan(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan", err);
        setLoading(false);
      });
  }, [planId]);

  if (loading) return <div>جاري التحميل...</div>;
  if (!plan) return <div>الخطة غير موجودة.</div>;

  return <ManagePlan plan={plan} />;
}

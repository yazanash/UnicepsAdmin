"use client";
import { PlanItem } from "@/types/plans";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import AddEditPlanModal from "./AddEditPlanModal";
import { api } from "@/lib/api";
// استورد مكتبة الـ api أو الـ fetch المعتمدة عندك
// import api from "@/lib/api";

interface PlanPricingProps {
  initialPlans: PlanItem[];
  productId: number; // استقبال الـ productId من الرابط مباشرة
  lang?: string;
}

const PlansPricing = ({
  initialPlans,
  productId,
  lang = "ar",
}: PlanPricingProps) => {
  const isAr = lang === "ar";
  const [plans, setPlans] = useState<PlanItem[]>(initialPlans);

  // دالة الحفظ والتعديل
  const handleSaveItem = async (updatedItem: PlanItem) => {
    try {
      if (updatedItem.id) {
        await api.put(`/Plan/${updatedItem.id}`, updatedItem);

        setPlans((prev) =>
          prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
        );
      } else {
        const res = await api.post(`/Plan`, updatedItem);
        const newItem = res.data;
        setPlans((prev) => [...prev, newItem]);
      }
    } catch (error) {
      console.error("Failed to save plan item", error);
    }
  };

  if (!plans || plans.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between my-3">
        <h1 className="text-2xl font-bold">Plans & Pricing</h1>
        <AddEditPlanModal
          productId={productId}
          onSave={handleSaveItem}
          triggerButton={
            <Button>{isAr ? "+ إضافة عنصر جديد" : "+ Add New Item"}</Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        {plans.map((plan) => {
          return (
            <Card
              key={plan.id}
              className="shadow-md border border-slate-800 bg-dark-900/80 rounded-2xl flex flex-col justify-between"
            >
              <CardHeader className="flex flex-row items-start justify-between pb-4">
                <div>
                  <CardTitle className="text-xl font-bold text-white mb-1">
                    {plan.name}
                  </CardTitle>
                </div>

                <AddEditPlanModal
                  productId={productId}
                  initialData={plan}
                  onSave={handleSaveItem}
                  triggerButton={
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 hover:bg-slate-800 text-xs"
                    >
                      {isAr ? "تعديل" : "Manage"}
                    </Button>
                  }
                />
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-200">
                      {plan.durationString} ({plan.daysCount}{" "}
                      {isAr ? "يوم" : "days"})
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-sm font-black text-teal-400">
                      {plan.isFree
                        ? isAr
                          ? "مجاني"
                          : "Free"
                        : `$${plan.price}`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlansPricing;

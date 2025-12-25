"use client";
import { use, useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import Link from "next/link";
import { Plan, PlanItem } from "@/types/plans";
import EditPlanItemModal from "./EditPlanItemModal";
import DeletePlanItemModal from "./DeletePlanItemModal";
import AddPlanItemModal from "./AddPlanItemModal";
import EditPlanModal from "./EditPlanModal";

export default function ManagePlan({ plan }: { plan: Plan }) {
  const [currentPlan, setCurrentPlan] = useState<Plan>(plan);
  if (!plan) return <div>Loading...</div>;
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h1 className="text-2xl font-bold mr-2.5">{currentPlan.name}</h1>
<EditPlanModal
      plan={currentPlan}
      onSave={async (updatedPlan) => {
        await api.put(`/Plan/${updatedPlan.id}`, updatedPlan);
        setCurrentPlan(updatedPlan);
      }}
    />
          </div>
        </div>
        
        <AddPlanItemModal
          planId={currentPlan.id}
          onAdd={async (newItem) => {
            const res = await api.post(`/Plan/Item`, newItem);
            const createdItem = res.data;
            setCurrentPlan((prev) => ({
              ...prev,
              planItems: [...prev.planItems, createdItem],
            }));
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Items</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Duration</TableHead>
                <TableHead>Days Count</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentPlan.planItems.map((item: PlanItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.durationString}</TableCell>
                  <TableCell>{item.daysCount}</TableCell>
                  <TableCell>
                    {item.isFree ? "Free" : item.price + "$"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <EditPlanItemModal
                      item={item}
                      onSave={async (updatedItem) => {
                        await api.put(
                          `/Plan/Items/${updatedItem.id}`,
                          updatedItem
                        );
                        setCurrentPlan((prev) => ({
                          ...prev,
                          planItems: prev.planItems.map((i) =>
                            i.id === updatedItem.id ? updatedItem : i
                          ),
                        }));
                      }}
                    />

                    {/* Delete Confirmation Modal */}
                    <DeletePlanItemModal
                      item={item}
                      onDelete={async (id) => {
                        await api.delete(`/PlanItem/Delete/${id}`);
                        setCurrentPlan((prev) => ({
                          ...prev,
                          planItems: prev.planItems.filter((i) => i.id !== id),
                        }));
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

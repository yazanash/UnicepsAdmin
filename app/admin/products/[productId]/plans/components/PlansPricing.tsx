"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plan } from "@/types/plans";
interface PlanPricingProps {
  plans: Plan[];
  // planItemStats: Record<number, number>; // {itemId: subscriptionCount}
}

const PlansPricing = ({ plans }: PlanPricingProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {plans.map((plan) => {
        // const totalSubs = plan.planItems.reduce(
        //   (sum, item) => sum + (planItemStats[item.id] || 0),
        //   15
        // );

        return (
          <Card key={plan.id} className="shadow-md border">
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>
                Target User :{" "}
                <span className="font-semibold">
                  {plan.productId === 0 ? "Uniceps" : "Uniceps Business"}
                </span>
              </CardDescription>
              <Link href={`/admin/products/${plan.productId}/plans/${plan.id}`}>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </Link>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Days Length</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {plan.planItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.durationString}</TableCell>

                      <TableCell className="font-medium">
                        {item.isFree ? "Free" : `${item.price}$`}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.daysCount}
                      </TableCell>
                      {/* <TableCell>{planItemStats[item.id] ?? 0}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
export default PlansPricing;

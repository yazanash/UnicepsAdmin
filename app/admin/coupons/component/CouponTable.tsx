"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CashRequestType } from "@/types/cashrequest";
// import SubscriptionCoupon from "./CashRequestModal";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { SubscriptionCoupon } from "@/types/subscriptionCoupon";
import AddEditCouponModal from "./CouponModal";
interface CouponProps {
  requests: SubscriptionCoupon[];
  // planItemStats: Record<number, number>; // {itemId: subscriptionCount}
}

const CouponTable = ({ requests }: CouponProps) => {
  const [localCoupons, setLocalCoupons] = useState(requests);
  const handleSaveItem = async (updatedItem: SubscriptionCoupon) => {
    try {
      if (updatedItem.id) {
        await api.put(`/SubscriptionCoupon/${updatedItem.id}`, updatedItem);

        setLocalCoupons((prev) =>
          prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
        );
      } else {
        const res = await api.post(`/SubscriptionCoupon`, updatedItem);
        const newItem = res.data;
        setLocalCoupons((prev) => [...prev, newItem]);
      }
    } catch (error) {
      console.error("Failed to save plan item", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Coupons</CardTitle>
          <AddEditCouponModal
            onSave={handleSaveItem}
            triggerButton={<Button>{"+ Add New Item"}</Button>}
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Expired At</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Value(%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localCoupons.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.code}</TableCell>
                  <TableCell>
                    {req.expirationAt
                      ? new Date(req.expirationAt).toLocaleDateString()
                      : "No date provided"}
                  </TableCell>
                  <TableCell>{req.descriptionMessage}</TableCell>
                  <TableCell>{req.couponValue}</TableCell>
                  <TableCell>
                    {" "}
                    <AddEditCouponModal
                      onSave={handleSaveItem}
                      initialData={req}
                      triggerButton={<Button>{"Edit"}</Button>}
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
};

export default CouponTable;

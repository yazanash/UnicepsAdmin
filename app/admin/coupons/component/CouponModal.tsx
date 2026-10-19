"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlanItem } from "@/types/plans";
import { useState, useEffect } from "react";
import { SubscriptionCoupon } from "@/types/subscriptionCoupon";

interface AddEditCouponModalProps {
  initialData?: SubscriptionCoupon | null;
  onSave: (item: SubscriptionCoupon) => void;
  triggerButton?: React.ReactNode;
}

const AddEditCouponModal = ({
  initialData,
  onSave,
  triggerButton,
}: AddEditCouponModalProps) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState<Partial<SubscriptionCoupon>>({
    id: 0,
    code: "",
    expirationAt: new Date(),
    descriptionMessage: "",
    couponValue: 0,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: 0,
        code: "",
        createdAt: new Date(),
        expirationAt: new Date(),
        descriptionMessage: "",
        couponValue: 0,
      });
    }
  }, [initialData, open]);

  const handleSave = () => {
    // نمرر البيانات المعالجة للـ callback
    onSave(formData as SubscriptionCoupon);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button>{isEditing ? "Edit Plan Item" : "Add Plan Item"}</Button>
        )}
      </DialogTrigger>
      <DialogContent className=" border border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-black">
            {isEditing ? "Edit Plan Item" : "Add New Plan Item"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Code
            </label>
            <Input
              value={formData.code || ""}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="bg-dark-950 border-slate-800 text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Expired At
            </label>
            <Input
              type="date"
              // بنتحقق إذا القيمة كائن Date بنحولها لصيغة YYYY-MM-DD، وإذا نص بنعرضه مباشر
              value={
                formData.expirationAt
                  ? new Date(formData.expirationAt).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expirationAt: new Date(e.target.value),
                })
              }
              className="bg-dark-950 border-slate-800 text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Description
            </label>
            <Input
              type="text"
              value={formData.descriptionMessage || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  descriptionMessage: e.target.value,
                })
              }
              className="bg-dark-950 border-slate-800 text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Value (%)
            </label>
            <Input
              type="number"
              value={formData.couponValue || 0}
              onChange={(e) => {
                const val = Number(e.target.value);
                setFormData({
                  ...formData,
                  couponValue: val,
                });
              }}
              className="bg-dark-950 border-slate-800 text-white"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>
            {isEditing ? "Save Changes" : "Add Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditCouponModal;

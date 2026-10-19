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

interface AddEditPlanModalProps {
  productId: number; // الاعتماد على productId بدل planId
  initialData?: PlanItem | null; // إذا أرسلنا بيانات يعني وضع تعديل Edit
  onSave: (item: PlanItem) => void;
  triggerButton?: React.ReactNode; // زر مخصص (سواء لفتح الإضافة أو زر تعديل صغير)
}

const AddEditPlanModal = ({
  productId,
  initialData,
  onSave,
  triggerButton,
}: AddEditPlanModalProps) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState<Partial<PlanItem>>({
    durationString: "",
    daysCount: 30,
    price: 0,
    isFree: true,
    productId: productId,
    name: "",
  });

  const [open, setOpen] = useState(false);

  // تحديث القيم عند فتح المودال أو تغير البيانات القادمة للتعديل
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        durationString: "",
        daysCount: 30,
        price: 0,
        isFree: true,
        productId: productId,
        name: "",
      });
    }
  }, [initialData, productId, open]);

  const handleSave = () => {
    // نمرر البيانات المعالجة للـ callback
    onSave(formData as PlanItem);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button>
            {isEditing ? "Edit Plan Item" : "Add Plan Item"}
          </Button>
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
            <label className="text-xs font-bold text-slate-300 block mb-1">Name</label>
            <Input
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-dark-950 border-slate-800 text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Duration (e.g. Monthly, Yearly)</label>
            <Input
              value={formData.durationString || ""}
              onChange={(e) =>
                setFormData({ ...formData, durationString: e.target.value })
              }
              className="bg-dark-950 border-slate-800 text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Days Count</label>
            <Input
              type="number"
              value={formData.daysCount || 0}
              onChange={(e) =>
                setFormData({ ...formData, daysCount: Number(e.target.value) })
              }
              className="bg-dark-950 border-slate-800 text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Price ($)</label>
            <Input
              type="number"
              value={formData.price || 0}
              onChange={(e) => {
                const val = Number(e.target.value);
                setFormData({
                  ...formData,
                  price: val,
                  isFree: val === 0,
                });
              }}
              className="bg-dark-950 border-slate-800 text-white"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
          >
            {isEditing ? "Save Changes" : "Add Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditPlanModal;
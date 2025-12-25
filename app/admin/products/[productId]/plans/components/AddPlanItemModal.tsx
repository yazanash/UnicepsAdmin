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
import { useState } from "react";

interface AddItemModalProps {
  planId: string;
  onAdd: (newItem: PlanItem) => void;
}

const AddPlanItemModal = ({ planId, onAdd }: AddItemModalProps) => {
  const [newItem, setNewItem] = useState<Partial<PlanItem>>({
    durationString: "",
    daysCount: 30,
    price: 0,
    isFree: true,
    planId,
  });
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    // نمرر العنصر الجديد للـ callback
    onAdd(newItem as PlanItem);
    // إعادة تعيين الفورم
    setNewItem({
      durationString: "",
      daysCount: 30,
      price: 0,
      isFree: true,
      planId,
    });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Plan Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <label>Duration</label>
            <Input
              value={newItem.durationString || ""}
              onChange={(e) =>
                setNewItem({ ...newItem, durationString: e.target.value })
              }
            />
          </div>
          <div>
            <label>Days Count</label>
            <Input
              type="number"
              value={newItem.daysCount || 0}
              onChange={(e) =>
                setNewItem({ ...newItem, daysCount: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label>Price</label>
            <Input
              type="number"
              value={newItem.price || 0}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  price: Number(e.target.value),
                  isFree: Number(e.target.value) === 0,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlanItemModal;

"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlanItem } from "@/types/plans";
import { useState } from "react";
interface EditItemModalProps {
  item: PlanItem;
  onSave: (updatedItem: PlanItem) => void;
}
const EditPlanItemModal = ({ item, onSave }: EditItemModalProps) => {
    const [editedItem, setEditedItem] = useState<PlanItem>(item);
     const [open, setOpen] = useState(false);
    const handleSave = () => {
    onSave(editedItem);
     setOpen(false);
  };
  return (
  <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Plan Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <label>Duration</label>
            <Input
              value={editedItem.durationString}
              onChange={(e) =>
                setEditedItem({ ...editedItem, durationString: e.target.value })
              }
            />
          </div>
          <div>
            <label>Days Count</label>
            <Input
              type="number"
              value={editedItem.daysCount}
              onChange={(e) =>
                setEditedItem({ ...editedItem, daysCount: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label>Price</label>
            <Input
              type="number"
              value={editedItem.price}
              onChange={(e) =>
                setEditedItem({
                  ...editedItem,
                  price: Number(e.target.value),
                  isFree: Number(e.target.value) === 0,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditPlanItemModal
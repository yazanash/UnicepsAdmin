"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlanItem } from "@/types/plans";
import { useState } from "react";
interface DeleteItemModalProps {
  item: PlanItem;
  onDelete: (id: number) => void;
}

const DeletePlanItemModal = ({ item, onDelete }: DeleteItemModalProps) => {
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    onDelete(item.id);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete {item.durationString}?</p>
        <DialogFooter className="flex gap-2">
          <Button variant="destructive" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePlanItemModal;

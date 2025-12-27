"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserStepType } from "@/types/userStep";
import { useState } from "react";
import { useEffect } from "react";
interface UserStepModalProps {
  productId: number;
  userStep?: UserStepType;
  onSave: (feature: UserStepType) => void;
}
const UserStepModal = ({ productId, userStep, onSave }: UserStepModalProps) => {
  const [newItem, setItem] = useState<Partial<UserStepType>>({
    stepNumber: 0,
    title: "",
    description: "",
     titleAr: "",
    descriptionAr: "",
    productId,
  });
  const [open, setOpen] = useState(false);
  const isEdit = !!userStep?.id;
  useEffect(() => {
    if (userStep) {
      setItem(userStep);
    } else {
      setItem({ title: "", description: "", titleAr: "",
    descriptionAr: "", productId });
    }
  }, [userStep, open]);
  const handleAdd = () => {
    // نمرر العنصر الجديد للـ callback
    onSave(newItem as UserStepType);
    // إعادة تعيين الفورم
    setItem({
      stepNumber: 0,
      title: "",
      description: "", titleAr: "",
    descriptionAr: "",
      productId,
    });
    setOpen(false);
    if (!isEdit) {
      setItem({ title: "", description: "", titleAr: "",
    descriptionAr: "", productId , stepNumber: 0});
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="icon">
            Edit
          </Button> // شكل زر التعديل في الجدول
        ) : (
          <Button>Add User Step</Button> // شكل زر الإضافة الرئيسي
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit User Step" : "Add New User Step"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
            <div>
            <Label>StepNumber</Label>
            <Input
              type="number"
              value={newItem.stepNumber || 0}
              onChange={(e) =>
                setItem({
                  ...newItem,
                  stepNumber: Number(e.target.value),
                })
              }
            />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={newItem.title || ""}
              onChange={(e) => setItem({ ...newItem, title: e.target.value })}
            />
          </div>
           <div>
            <Label>Arabic Title</Label>
            <Input
              value={newItem.titleAr || ""}
              onChange={(e) => setItem({ ...newItem, titleAr: e.target.value })}
            />
          </div>
          <div className="col-span-3 space-y-2">
            <Label>Description</Label>
            <Textarea
              value={newItem.description || ""}
              onChange={(e) =>
                setItem({ ...newItem, description: e.target.value })
              }
              rows={4}
            />
          </div>
           <div className="col-span-3 space-y-2">
            <Label>Arabic Description</Label>
            <Textarea
              value={newItem.descriptionAr || ""}
              onChange={(e) =>
                setItem({ ...newItem, descriptionAr: e.target.value })
              }
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAdd}>
            {isEdit ? "Save Changes" : "Add User Step"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserStepModal;

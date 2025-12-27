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
import { FeatureType } from "@/types/productFeature";
import { useState } from "react";
import { useEffect } from "react";
interface AddFeatureModalProps {
  productId: number;
  feature?: FeatureType;
  onSave: (feature: FeatureType) => void;
}
const FeatureModal = ({ productId, feature, onSave }: AddFeatureModalProps) => {
  const [newItem, setItem] = useState<Partial<FeatureType>>({
    title: "",
    description: "",
    titleAr: "",
    descriptionAr: "",
    productId,
  });
  const [open, setOpen] = useState(false);
  const isEdit = !!feature?.id;
  useEffect(() => {
    if (feature) {
      setItem(feature);
    } else {
      setItem({
        title: "",
        description: "",
        titleAr: "",
        descriptionAr: "",
        productId,
      });
    }
  }, [feature, open]);
  const handleAdd = () => {
    // نمرر العنصر الجديد للـ callback
    onSave(newItem as FeatureType);
    // إعادة تعيين الفورم
    setItem({
      title: "",
      description: "",
      titleAr: "",
      descriptionAr: "",
      productId,
    });
    setOpen(false);
    if (!isEdit) {
      setItem({
        title: "",
        description: "",
        titleAr: "",
        descriptionAr: "",
        productId,
      });
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
          <Button>Add Feature</Button> // شكل زر الإضافة الرئيسي
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Feature" : "Add New Feature"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <label>Title</label>
            <Input
              value={newItem.title || ""}
              onChange={(e) => setItem({ ...newItem, title: e.target.value })}
            />
          </div>
          <div>
            <label>Arabic Title</label>
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
            {isEdit ? "Save Changes" : "Add Feature"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;

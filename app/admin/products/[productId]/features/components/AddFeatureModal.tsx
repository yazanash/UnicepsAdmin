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
import { useState, useEffect } from "react";
import Image from "next/image";

interface AddFeatureModalProps {
  productId: number;
  feature?: FeatureType;
  onSave: (formData: FormData) => void; 
}

const FeatureModal = ({ productId, feature, onSave }: AddFeatureModalProps) => {
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    titleAr: "",
    descriptionAr: "",
    productId: productId,
    featureImage: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const isEdit = !!feature?.id;

  useEffect(() => {
    if (feature) {
      setNewItem({
        title: feature.title || "",
        description: feature.description || "",
        titleAr: feature.titleAr || "",
        descriptionAr: feature.descriptionAr || "",
        productId: feature.productId || productId,
        featureImage: null,
      });
      // إذا كانت الميزة تمتلك صورة قديمة مخزنة بالرابط
      setPreviewImage(feature.imageUrl ? feature.imageUrl : null);
    } else {
      setNewItem({
        title: "",
        description: "",
        titleAr: "",
        descriptionAr: "",
        productId: productId,
        featureImage: null,
      });
      setPreviewImage(null);
    }
  }, [feature, open, productId]);

  // التعامل مع اختيار الصورة وعمل Preview فوري
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewItem({ ...newItem, featureImage: file });
      // توليد رابط مؤقت للـ Preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleSave = () => {
    // تجهيز الـ FormData لإرسالها للباك إند
    const formData = new FormData();
    if (isEdit && feature?.id) {
      formData.append("id", feature.id.toString());
    }
    formData.append("productId", newItem.productId.toString());
    formData.append("title", newItem.title);
    formData.append("description", newItem.description);
    formData.append("titleAr", newItem.titleAr);
    formData.append("descriptionAr", newItem.descriptionAr);
    
    if (newItem.featureImage) {
      formData.append("featureImage", newItem.featureImage);
    }

    // استدعاء دالة الحفظ بالـ parent
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
            ✏️
          </Button>
        ) : (
          <Button className="bg-teal-500 hover:bg-teal-400 text-dark-950 font-bold">
            + Add Feature
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="border border-slate-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-black">
            {isEdit ? "Edit Feature" : "Add New Feature"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Title Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-bold text-slate-300">Title</Label>
              <Input
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="bg-dark-950 border-slate-800 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold text-slate-300">Arabic Title</Label>
              <Input
                value={newItem.titleAr}
                onChange={(e) => setNewItem({ ...newItem, titleAr: e.target.value })}
                className="bg-dark-950 border-slate-800 text-white mt-1"
              />
            </div>
          </div>

          {/* Description Fields */}
          <div>
            <Label className="text-xs font-bold text-slate-300">Description</Label>
            <Textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              rows={3}
              className="bg-dark-950 border-slate-800 text-white mt-1"
            />
          </div>
          <div>
            <Label className="text-xs font-bold text-slate-300">Arabic Description</Label>
            <Textarea
              value={newItem.descriptionAr}
              onChange={(e) => setNewItem({ ...newItem, descriptionAr: e.target.value })}
              rows={3}
              className="bg-dark-950 border-slate-800 text-white mt-1"
            />
          </div>

          {/* Image Upload & Preview Section */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-300">Feature Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-dark-950 border-slate-800 text-white cursor-pointer file:text-teal-400 file:border-0 file:bg-transparent"
            />

            {/* Image Preview Box */}
            {previewImage && (
              <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-slate-800 mt-2 bg-dark-950">
                <Image
                  src={previewImage}
                  alt="Feature Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-teal-500 hover:bg-teal-400 text-dark-950 font-black w-full"
          >
            {isEdit ? "Save Changes" : "Add Feature"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;
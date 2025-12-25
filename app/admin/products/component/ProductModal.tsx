"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // من shadcn/ui
import { api } from "@/lib/api";
import {
  ProductType,
  PlatformEnum,
  PLATFORM_MAP_REVERSE,
} from "@/types/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const PLATFORMS = [
  { label: "Mobile", value: PlatformEnum.Mobile },
  { label: "Desktop", value: PlatformEnum.Desktop },
  { label: "Web", value: PlatformEnum.Web },
];

interface ProductModalProps {
  product?: ProductType;
  onSaved: (product: ProductType, isEdit: boolean) => void;
}

const ProductModal = ({ product, onSaved }: ProductModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(product?.name ?? "");
  const [platform, setPlatform] = useState<PlatformEnum>(
    product?.platform ?? PlatformEnum.Desktop
  );

  const [description, setDescription] = useState(product?.description ?? "");
  const [appId, setAppId] = useState(product?.appId ?? 0);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(product?.heroImage ?? null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // للمعاينة الفورية
    }
  };

 const handleSave = async () => {
  const formData = new FormData();
  formData.append("Name", name);
  formData.append("Description", description);
  formData.append("Platform", String(platform));
  formData.append("AppId", String(appId));
  if (imageFile) formData.append("HeroImage", imageFile);

  try {
    let res;
    if (product) {
      res = await api.put(`/Product/${product.id}`, formData);
    } else {
      res = await api.post(`/Product`, formData);
    }

    const savedData = res.data || { 
        id: product?.id || Math.random(), 
        name, description, platform, appId, 
        heroImage: product?.heroImage 
    };

    onSaved(savedData, !!product); 
    
    // ✅ وضع الإغلاق في النهاية لضمان تنفيذه
    setOpen(false); 

  } catch (err) {
    console.error("Save error:", err);
    alert("حدث خطأ أثناء الحفظ، يرجى المحاولة مرة أخرى.");
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={product ? "outline" : "default"}>
          {product ? "Edit" : "Add Product"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <Label className="self-start">Product Image</Label>
            <div className="w-full h-40 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center overflow-hidden bg-gray-900">
              {preview ? (
                <img src={preview.startsWith('http') || preview.startsWith('/') ? preview : preview} className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-500 text-xs">No image selected</span>
              )}
            </div>
            <Input type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer" />
          </div>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصف المنتج"
              rows={4}
            />
          </div>
          <div>
            <Label>Platform</Label>

            <Select
              value={String(platform)}
              onValueChange={(e) => setPlatform(Number(e))}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Platfrom" />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((p) => (
                  <SelectItem key={p.value} value={String(p.value)}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>App ID</Label>
            <Input
              type="number"
              value={appId}
              onChange={(e) => setAppId(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;

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
import { PaymentGateway } from "@/types/payment-gateway";

interface GatewayModalProps {
  gateway?: PaymentGateway;
  onSaved: (gateway: PaymentGateway, isEdit: boolean) => void;
}

const GatewayModal = ({ gateway, onSaved }: GatewayModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(gateway?.name ?? "");
  const [transferInfo, setTransferInfo] = useState(gateway?.transferInfo ?? "");
  const [isActive, setIsActive] = useState(gateway?.isActive ?? true);
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);

  const handleSave = async () => {
    // استخدام FormData بدلاً من Object عادي لأننا سنرسل ملفاً
    const formData = new FormData();
    formData.append("name", name);
    formData.append("transferInfo", transferInfo);
    formData.append("isActive", String(isActive));

    if (qrCodeFile) {
      formData.append("qrCodeFile", qrCodeFile); // اسم الحقل يجب أن يطابق الباك إيند
    }

    let saved: PaymentGateway;
    try {
      if (gateway) {
        // تعديل
        const res = await api.put(`/PaymentGateway/${gateway.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        saved = res.data;
        onSaved(saved, true);
      } else {
        // إضافة
        const res = await api.post(`/PaymentGateway`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res);
        saved = res.data;
        onSaved(saved, false);
      }
      setOpen(false);
      setQrCodeFile(null); // تنظيف الملف بعد النجاح
    } catch (error) {
      console.error("Error saving gateway", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={gateway ? "outline" : "default"}>
          {gateway ? "Edit" : "Add Gateway"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{gateway ? "Edit Gateway" : "Add Gateway"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>QR Code Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setQrCodeFile(e.target.files?.[0] || null)}
            />
            {/* عرض معاينة للصورة إذا كانت موجودة (اختياري) */}
            {(qrCodeFile || gateway?.qrCodeUrl) && (
              <div className="mt-2">
                <img
                  src={
                    qrCodeFile
                      ? URL.createObjectURL(qrCodeFile)
                      : `${api.defaults.baseURL?.replace("/api", "")}${
                          gateway?.qrCodeUrl
                        }`
                  }
                  alt="QR Preview"
                  className="h-20 w-20 object-cover border rounded"
                />
              </div>
            )}
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
            <Label>Transfer Info</Label>
            <Textarea
              value={transferInfo}
              onChange={(e) => setTransferInfo(e.target.value)}
              placeholder="اكتب تعليمات التحويل هنا..."
              rows={4}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <Label>Active</Label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GatewayModal;

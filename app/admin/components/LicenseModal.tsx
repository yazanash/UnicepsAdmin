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
import { api } from "@/lib/api";
import { LicenseType } from "@/types/products";
import { Edit } from "lucide-react";

interface LicenseModalProps {
  license?: LicenseType;
  onSaved: (license: LicenseType, isEdit: boolean) => void;
}

const LicenseModal = ({ license, onSaved }: LicenseModalProps) => {
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState(license?.customerName ?? "");
  const [expireDate, setExpireDate] = useState(
    license?.expireDate?.split("T")[0] ?? "",
  );
  const [maxDevices, setMaxDevices] = useState(license?.maxDevices ?? 5);

  const handleSave = async () => {
    const payload = {
      customerName,
      expireDate: expireDate === "" ? null : expireDate,
      maxDevices: Number(maxDevices),
      productId: 2, // ثابت لمنتج النادي حسب بياناتك
      type: 0,
    };

    try {
      let saved: LicenseType;
      if (license) {
        // تحديث
        const res = await api.put(`/Licenses/${license.id}`, payload);
        saved = res.data;
        onSaved(saved, true);
      } else {
        // إضافة جديد
        console.log(payload);
        const res = await api.post(`/Licenses`, payload);
        console.log(res);
        saved = res.data;
        onSaved(saved, false);
      }
      setOpen(false);
    } catch (error) {
      console.error("Error saving license", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {license ? (
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md">
            <Edit size={18} />
          </button>
        ) : (
          <Button>إضافة ترخيص جديد</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {license ? "تعديل ترخيص" : "إنشاء ترخيص جديد"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>اسم الزبون (النادي)</Label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="مثلاً: Gym Master"
            />
          </div>
          <div className="space-y-2">
            <Label>تاريخ انتهاء الصلاحية</Label>
            <Input
              type="date"
              required={false}
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>الحد الأقصى للأجهزة</Label>
            <Input
              type="number"
              value={maxDevices}
              onChange={(e) => setMaxDevices(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>حفظ الترخيص</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseModal;
